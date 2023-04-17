import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'

import { Home } from './Home'
import { usePokemonList } from '../hooks/usePokemonList'
import { BrowserRouter } from 'react-router-dom'

jest.mock('../hooks/usePokemonList')

describe('Home page', () => {
  it('renders correctly', async () => {
    window.scrollTo = jest.fn()
    const usePokemonListMocked = jest.mocked(usePokemonList)

    usePokemonListMocked.mockResolvedValueOnce({
      data: {
        count: 3,
        results: [
          {
            name: 'bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon/1/',
          },
          {
            name: 'ivysaur',
            url: 'https://pokeapi.co/api/v2/pokemon/2/',
          },
          {
            name: 'venusaur',
            url: 'https://pokeapi.co/api/v2/pokemon/3/',
          },
        ],
      },
      isLoading: false,
      error: false,
    } as never)

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    )
    await waitFor(() => expect(screen.getByText('Pokédex')).toBeInTheDocument())
  })
})
