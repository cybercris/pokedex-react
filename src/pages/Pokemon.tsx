import { BsArrowLeft, BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { RiRulerLine, RiScales2Line } from 'react-icons/ri'
import { Link, useParams } from 'react-router-dom'

import { Loader } from '../components/Loader'
import api from '../services/api'
import { GetPokemonListResponse } from '../types/pokemon'
import { renderAbilityName, renderId, renderStatName } from '../utils'
import usePokemon from '../hooks/usePokemon'

export function Pokemon() {
  const { name } = useParams()
  const { data, isLoading, error } = usePokemon(name)

  if (error) return null

  return (
    <main className="max-w-3xl mx-auto px-6 py-8 flex flex-col bg-yellow-500">
      <header className="flex items-center justify-between px-5 bg-blue-500">
        <div className="flex items-center">
          <Link
            to="/"
            title="Go back"
            className="hover:opacity-70 transition-all"
          >
            <BsArrowLeft className="mr-4" size={26} />
            <span className="sr-only">Go back</span>
          </Link>

          <h1 className="text-2xl font-bold">{data?.name}</h1>
        </div>

        <span>#{renderId(String(data?.id))}</span>
      </header>
      <div className="flex-1 mt-24 rounded-lg px-5 pb-11">
        <section>
          <div className="-mt-24 flex items-start content-between">
            <a
              className={`content-start ${data?.id <= 1 ? 'hidden' : ''}`}
              title={`Go to Pokémon #${data?.id - 1}`}
            >
              <BsChevronLeft />

              <span className="sr-only">Go to Pokémon #{data?.id - 1}</span>
            </a>

            {data?.sprites.front_default && (
              <img
                className="h-52 w-52"
                src={data?.sprites.front_default}
                alt={`image of ${data?.name}`}
              />
            )}

            <Link to={`/pokemon/${data.id + 1}`}>
              <a
                className={`content-end ${data?.id >= count ? 'hidden' : ''}`}
                title={`Go to Pokémon #${data?.id + 1}`}
              >
                <BsChevronRight />

                <span className="sr-only">Go to Pokémon #{data?.id + 1}</span>
              </a>
            </Link>
          </div>

          <ul className="flex items-center content-center mb-5">
            {data?.types.map(({ type }) => (
              <li key={type.name} className={type.name}>
                {type.name}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="block mb-4">About</h2>
          <ul className="max-w-sm">
            {!!data?.weight && (
              <li>
                <p>
                  <RiScales2Line /> {data?.weight / 10} kg
                  <span>Weight</span>
                </p>
              </li>
            )}

            {!!data?.height && (
              <li>
                <p>
                  <RiRulerLine /> {data?.height / 10} m <span>Height</span>
                </p>
              </li>
            )}

            {!!data?.abilities?.length && (
              <li>
                <ul>
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
          <section>
            <h2 className="block mb-4">Base stats</h2>

            <ul className="max-w-xs mt-4 mx-auto mb-0">
              {data.stats.map((stat) => {
                if (!stat.stat.name) return null

                return (
                  <li key={stat.stat.name}>
                    <span>{renderStatName(stat.stat.name)}</span>

                    <p>
                      <span className="min-w-fit">
                        {stat.base_stat < 100
                          ? `0${stat.base_stat}`
                          : stat.base_stat}
                      </span>

                      <span className="h-2 rounded-lg ml-4">
                        <span
                          className="h-full black left-0 absolute"
                          style={{
                            width: `${(stat.base_stat / 300) * 100}%`,
                          }}
                        />
                      </span>
                    </p>
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
