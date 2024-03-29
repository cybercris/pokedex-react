import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'

import { usePokemon } from '../hooks/usePokemon'

import { PokemonCard } from './PokemonCard'
import { BrowserRouter } from 'react-router-dom'

const pokemon = {
  name: 'bulbasaur',
  url: 'https://pokeapi.co/api/v2/pokemon/bulbasaur',
}

jest.mock('../hooks/usePokemon')

describe('PokémonCard component', () => {
  it('renders skeleton correctly', () => {
    const usePokemonMocked = jest.mocked(usePokemon)

    usePokemonMocked.mockReturnValueOnce({
      data: {},
      isLoading: true,
      error: false,
    } as any)

    render(<PokemonCard pokemon={pokemon} />)

    expect(screen.getByText('Loading')).toBeInTheDocument()
  })

  it('renders correctly', async () => {
    const usePokemonMocked = jest.mocked(usePokemon)

    usePokemonMocked.mockReturnValueOnce({
      data: {
        id: '1',
        name: 'bulbasaur',
        sprites: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        },
        types: [
          {
            slot: 1,
            type: {
              name: 'grass',
            },
          },
        ],
      },
      isLoading: false,
      error: false,
    } as any)

    render(
      <BrowserRouter>
        <PokemonCard pokemon={pokemon} />
      </BrowserRouter>,
    )

    await waitFor(() =>
      expect(screen.getByText('bulbasaur')).toBeInTheDocument(),
    )
  })
})
