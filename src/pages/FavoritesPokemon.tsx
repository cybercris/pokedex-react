import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdCatchingPokemon } from 'react-icons/md'

import { PokemonCard } from '../components/PokemonCard'
import { Loader } from '../components/Loader'
import { useFavorites } from '../contexts/FavoritesContext'

export function FavoritesPokemon() {
  const { favorites } = useFavorites()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  return (
    <main className="max-w-3xl mx-auto px-6 py-8">
      <header className="flex items-center justify-between mb-6 px-1">
        <div className="flex items-center">
          <Link
            to="/"
            className="flex text-2xl font-bold text-black mr-5 
              hover:opacity-70 hover:underline transition"
            type="button"
          >
            <MdCatchingPokemon className="mr-3" size={34} /> Pokédex
          </Link>
          {/* {isLoading && <Loader />} */}
        </div>
      </header>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {favorites.map((pokemon) => (
          <li key={pokemon.name}>
            <PokemonCard pokemon={pokemon} />
          </li>
        ))}
      </ul>
    </main>
  )
}
