import { act } from 'react'
import { render, screen } from '@testing-library/react'
import Navigation from '@/app/components/Navigation'

describe('Navigation', () => {
  // Renders the navigation menu with all links visible on desktop
  it('should render the navigation menu with all links visible on desktop', async () => {
    await act(async () => {
      render(<Navigation />)
    })

    expect(screen.getByText('Unlcoaching')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()
    expect(screen.queryByText('Accueil')).not.toBeInTheDocument()
    expect(screen.queryByText('Rejoignez-nous !')).not.toBeInTheDocument()
  })

  // Renders the navigation menu with a hamburger icon on mobile
  it('should render the navigation menu with a hamburger icon on mobile', async () => {
    await act(async () => {
      render(<Navigation />)
    })

    expect(
      screen.getByRole('button', { class: 'md:hidden text-md' }),
    ).toBeInTheDocument()
  })
})
