import { useEffect, useState } from 'react'
import {
  BsArrowLeft,
  BsChevronLeft,
  BsChevronRight,
  BsStar,
} from 'react-icons/bs'
import { RiRulerLine, RiScales2Line } from 'react-icons/ri'
import { Link, useNavigate, useParams } from 'react-router-dom'

import usePokemon from '../hooks/usePokemon'
import { useFavorites } from '../contexts/FavoritesContext'
import api from '../services/api'
import { renderAbilityName, renderId, renderStatName } from '../utils'

export function Pokemon() {
  const { id } = useParams()
  const { data, isLoading, error } = usePokemon(id)
  const { toggleFavorite } = useFavorites()
  const navigate = useNavigate()
  const [count, setCount] = useState()

  useEffect(() => {
    async function getPokemonCount() {
      const { count } = await api.get('pokemon')
      setCount(count)
    }
    getPokemonCount()
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  if (error) return null

  return (
    <main className="max-w-3xl mx-auto p-6 flex flex-col">
      <header className="flex items-center justify-between px-5">
        <div className="flex items-center">
          <a
            onClick={() => navigate(-1)}
            title="Go back"
            className="hover:opacity-70 transition-all"
          >
            <BsArrowLeft className="mr-4" size={24} />
            <span className="sr-only">Go back</span>
          </a>

          <h1 className="text-2xl font-bold mr-6">{data?.name}</h1>

          <button
            type="button"
            className="hover:opacity-70 transition-all self-center mt-0.5"
            onClick={() => toggleFavorite(data)}
          >
            <BsStar size={24} />
          </button>
        </div>

        <span>#{renderId(String(data?.id))}</span>
      </header>
      <div className="flex-1 mt-24 rounded-lg px-5 pb-11">
        <section className="mb-5">
          <div className="-mt-24 flex items-center justify-between">
            {data?.id && (
              <Link
                to={`/pokemon/${data.id - 1}`}
                className={`justify-start ${data.id <= 1 ? 'hidden' : ''}`}
                title={`Go to Pokémon #${data.id - 1}`}
              >
                <BsChevronLeft size={26} />
                <span className="sr-only">Go to Pokémon #{data.id - 1}</span>
              </Link>
            )}

            {data?.sprites.front_default && (
              <div className="flex flex-grow justify-center">
                <img
                  className="h-52 w-52"
                  src={data?.sprites.front_default}
                  alt={`image of ${data?.name}`}
                />
              </div>
            )}

            {data?.id && (
              <Link
                to={`/pokemon/${data.id + 1}`}
                className={`justify-end ${data?.id >= count ? 'hidden' : ''}`}
                title={`Go to Pokémon #${data?.id + 1}`}
              >
                <BsChevronRight size={26} />
                <span className="sr-only">Go to Pokémon #{data?.id + 1}</span>
              </Link>
            )}
          </div>
          <ul className="flex items-center justify-center">
            {data?.types.map(({ type }) => (
              <li key={type.name} className={type.name}>
                {type.name}
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col items-center mb-5">
          <h2 className="block mb-4 text-2xl font-bold">About</h2>
          <ul className="grid grid-flow-col auto-cols-max gap-10 max-w-sm">
            {!!data?.weight && (
              <li className="flex flex-col items-center justify-center">
                <p className="flex items-center">
                  <RiScales2Line size={22} className="mr-1" />
                  {data?.weight / 10} kg
                </p>
                <p>Weight</p>
              </li>
            )}

            {!!data?.height && (
              <li className="flex flex-col items-center justify-center">
                <p className="flex items-center">
                  <RiRulerLine size={22} className="mr-1" />
                  {data?.height / 10} m
                </p>
                <p>Height</p>
              </li>
            )}

            {!!data?.abilities?.length && (
              <li className="flex flex-col items-center justify-center">
                <ul className="flex flex-col items-center">
                  {data.abilities.map(({ ability }) => {
                    if (!ability.name) return null

                    return (
                      <li key={ability.url}>
                        <p>{renderAbilityName(ability.name)}</p>
                      </li>
                    )
                  })}
                </ul>
                <span>Abilities</span>
              </li>
            )}
          </ul>
        </section>

        {!!data?.stats?.length && (
          <section className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Base stats</h2>

            <ul className="flex flex-col w-full">
              {data.stats.map((stat) => {
                if (!stat.stat.name) return null

                return (
                  <li className="flex items-center w-full" key={stat.stat.name}>
                    <p className="mr-2 w-10 text-end">
                      {renderStatName(stat.stat.name)}
                    </p>
                    <span className="w-10 mr-2">
                      {stat.base_stat < 100
                        ? `0${stat.base_stat}`
                        : stat.base_stat}
                    </span>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <div
                        className="bg-blue-600 h-2 rounded-full dark:bg-blue-500"
                        style={{
                          width: `${(stat.base_stat / 200) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </section>
        )}
      </div>
    </main>
  )
}
