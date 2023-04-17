import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import queryClient from './services/queryClient'
import { FavoritesProvider } from './contexts/FavoritesContext'
import { Router } from './Router'
import './index.css'

export function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <FavoritesProvider>
          <Router />
          <ReactQueryDevtools initialIsOpen />
        </FavoritesProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
