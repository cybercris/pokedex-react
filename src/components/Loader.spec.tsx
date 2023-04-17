import { render, screen } from '@testing-library/react'

import { Loader } from './Loader'

describe('Loader component', () => {
  it('renders correctly', () => {
    render(<Loader />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
