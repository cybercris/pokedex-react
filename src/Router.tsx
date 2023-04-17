import { Routes, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { Pokemon } from './pages/Pokemon'
import { FavoritesPokemon } from './pages/FavoritesPokemon'

export function Router() {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<Pokemon />} />
        <Route path="/favorites" element={<FavoritesPokemon />} />
      </Route>
    </Routes>
  )
}
