import React, { useEffect, useState } from 'react'
import { MdCatchingPokemon } from 'react-icons/md'
import { BsStars } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import { usePokemonList } from '../hooks/usePokemonList'

import { PokemonCard } from '../components/PokemonCard'
import { Loader } from '../components/Loader'
import { Pagination } from '../components/Pagination'

export function Home() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isFetching, error } = usePokemonList(page, 60)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [page])

  if (error)
    return (
      <>
        <main className="max-w-3xl mx-auto">
          <h1>Ooops!!! Something went wrong... try again later.</h1>
        </main>
      </>
    )

  return (
    <main className="max-w-3xl mx-auto px-6 py-8">
      <header className="flex items-end justify-between mb-6 px-1">
        <div className="flex items-center">
          <button
            className="flex text-2xl font-bold text-black mr-5 
              hover:opacity-70 transition"
            type="button"
            onClick={() => setPage(1)}
          >
            <MdCatchingPokemon className="mr-3" size={34} /> Pokédex
          </button>
          {isLoading && <Loader />}
        </div>
        <Link to="/favorites" className="flex hover:underline hover:opacity-70">
          <BsStars className="mr-1" size={24} />
          <span className="text-lg">Favorites</span>
        </Link>
      </header>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {!isLoading &&
          data?.results.map((pokemon) => (
            <li key={pokemon.name}>
              <PokemonCard pokemon={pokemon} />
            </li>
          ))}
      </ul>
      {!isLoading && (
        <Pagination
          totalCountOfRegister={data?.count}
          currentPage={page}
          registersPerPage={60}
          onPageChange={setPage}
        />
      )}
    </main>
  )
}
