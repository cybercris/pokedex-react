import { createContext, ReactNode, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Pokemon } from '../types/pokemon'

interface FavoritesContextType {
  favorites: Pokemon[]
  toggleFavorite: (pokemon: Pokemon) => void
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
})

interface FavoritesProviderProps {
  children: ReactNode
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useLocalStorage<Pokemon[]>('favorites', [])

  function addFavorite(pokemon: Pokemon) {
    favorites && setFavorites([...favorites, pokemon])
  }

  function removeFavorite(pokemon: Pokemon) {
    favorites &&
      setFavorites(
        favorites.filter((favorite) => favorite.name !== pokemon.name),
      )
  }

  function toggleFavorite(pokemon: Pokemon) {
    if (favorites) {
      if (favorites.some((favorite) => favorite.name === pokemon.name)) {
        removeFavorite(pokemon)
      } else {
        addFavorite(pokemon)
      }
    }
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites: favorites ?? [], toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
