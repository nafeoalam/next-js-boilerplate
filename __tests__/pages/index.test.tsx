import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '@/pages'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /Next.js E-commerce boilerplate/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
