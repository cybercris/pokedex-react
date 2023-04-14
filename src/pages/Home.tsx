import { useEffect, useState } from 'react'
import { TbPokeball } from 'react-icons/tb'

import usePokemonList from '../hooks/usePokemonList'
import { PokemonCard } from '../components/PokemonCard'

export function Home() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isFetching, error } = usePokemonList(page, 60)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [page])

  if (error)
    return (
      <main className="max-w-3xl mx-auto">
        <h1>Oops! Something went wrong... please try again later.</h1>
      </main>
    )

  return (
    <main className="max-w-3xl mx-auto">
      <header className="shrink-0 flex items-center">
        <button
          className="flex items-center text-2xl font-bold text-black"
          type="button"
          onClick={() => setPage(1)}
        >
          <TbPokeball /> Pokédex
        </button>
      </header>
      <ul className="grid grid-cols-3 gap-1">
        {data?.results.map((pokemon) => (
          <li key={pokemon.name}>
            <PokemonCard pokemon={pokemon} />
          </li>
        ))}
      </ul>
    </main>
  )
}
