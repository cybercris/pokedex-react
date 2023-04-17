import React from 'react'
import { Link } from 'react-router-dom'

import { usePokemon } from '../hooks/usePokemon'
import { SimpleAttribute } from '../types/pokemon'
import { renderId } from '../utils'

import { CardSkeleton } from './CardSkeleton'

interface PokemonCardProps {
  pokemon: SimpleAttribute
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const { data, isLoading, error } = usePokemon(pokemon.name)

  if (error) return null
  if (isLoading) return <CardSkeleton />

  return (
    <Link
      to={`/pokemon/${data?.id}`}
      className="block px-4 py-1 border rounded-lg shadow-md hover:opacity-80 transition bg-white"
    >
      {/* <span className={data?.types[0].type.name}> */}
      <p className="text-end">#{renderId(String(data?.id))}</p>

      <div className="flex justify-center">
        {data?.sprites.front_default && (
          <img
            className="h-24"
            src={data?.sprites.front_default}
            alt={`image of ${pokemon?.name}`}
          />
        )}
      </div>

      <h2 className="text-center text-sm md:text-lg">{data?.name}</h2>
    </Link>
  )
}
