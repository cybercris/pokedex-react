import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import queryClient from './services/queryClient'
import { Router } from './Router'
import './index.css'

export function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Router />
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </BrowserRouter>
  )
}
