import { useQuery } from 'react-query'

import api from '../services/api'
import { Pokemon } from '../types/pokemon'

async function getPokemon(name: string): Promise<Pokemon> {
  const { data } = await api.get<Pokemon>(`pokemon/${name}`)
  return data
}

export function usePokemon(name: string) {
  return useQuery(['pokemon', name], () => getPokemon(name), {
    staleTime: 1000 * 60 * 10,
  })
}
