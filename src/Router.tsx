import { Routes, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { Pokemon } from './pages/Pokemon'

export function Router() {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<Pokemon />} />
      </Route>
    </Routes>
  )
}
