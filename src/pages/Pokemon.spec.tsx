import React from 'react'
import { render, screen } from '@testing-library/react'

import { Pokemon } from '../pages/Pokemon'
import { Pokemon as PokemonInterface } from '../types/pokemon'
import { BrowserRouter } from 'react-router-dom'

const testPokemon = {
  id: 25,
  name: 'pikachu',
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  },
  types: [
    {
      slot: 1,
      type: {
        name: 'electric',
        url: 'https://pokeapi.co/api/v2/type/13/',
      },
    },
  ],
}

describe('Pokémon page', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <Pokemon count={1000} pokemon={testPokemon as PokemonInterface} />
      </BrowserRouter>,
    )

    expect(screen.getByText(testPokemon.name)).toBeInTheDocument()
  })
})
