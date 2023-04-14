import usePokemon from '../hooks/usePokemon'
import { SimpleAttribute } from '../types/pokemon'
import renderId from '../utils/renderId'

import { CardSkeleton } from './CardSkeleton'

interface PokemonCardProps {
  pokemon: SimpleAttribute
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const { data, isLoading, error } = usePokemon(pokemon.name)

  if (error) return null

  if (isLoading) return <CardSkeleton />

  return (
    <div className="p-4 border rounded-lg shadow-md hover:opacity-80 transition">
      {/* <span className={data?.types[0].type.name}> */}
      <span>#{renderId(String(data?.id))}</span>

      <div>
        {data?.sprites.front_default && (
          <img
            className="h-72 w-72"
            src={data?.sprites.front_default}
            alt={`image of ${pokemon?.name}`}
          />
        )}
      </div>

      <h2>{data?.name}</h2>
    </div>
  )
}
