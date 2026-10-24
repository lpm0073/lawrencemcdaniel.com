import { screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { renderWithProviders } from '../../../test/render'
import { Header } from './Component'

const desktopWidth = window.innerWidth

function setWindowWidth(width: number) {
  Object.defineProperty(window, 'innerWidth', { value: width, configurable: true })
}

describe('Header', () => {
  afterEach(() => {
    setWindowWidth(desktopWidth)
  })

  it('renders the main navigation', async () => {
    const { user } = renderWithProviders(<Header />)

    const nav = screen.getByRole('navigation', { name: 'Main Navigation' })
    expect(nav).toBeInTheDocument()
    for (const name of [
      'Home',
      'About',
      'Education',
      'Consulting',
      'Clients',
      'Contact',
    ]) {
      expect(screen.getByRole('link', { name })).toBeInTheDocument()
    }

    await user.click(screen.getByRole('button', { name: 'Skills' }))
    expect(await screen.findByRole('link', { name: /Data Science/ })).toHaveAttribute(
      'href',
      '/data-science'
    )
    expect(screen.getByRole('link', { name: /Full Stack/ })).toHaveAttribute(
      'href',
      '/full-stack'
    )
    expect(screen.getByRole('link', { name: /Cloud/ })).toHaveAttribute('href', '/cloud')
    expect(screen.getByRole('link', { name: /Open edX/ })).toHaveAttribute(
      'href',
      '/openedx'
    )
    expect(screen.getByRole('link', { name: /ReactJS/ })).toHaveAttribute(
      'href',
      '/react'
    )
  })

  it('marks the clicked link active', async () => {
    const { user } = renderWithProviders(<Header />, { route: '/contact' })

    for (const name of [
      'Home',
      'About',
      'Education',
      'Consulting',
      'Clients',
      'Contact',
    ]) {
      const link = screen.getByRole('link', { name })
      await user.click(link)
      expect(link).toHaveClass('active')
    }
  })

  it('opens the menu with the toggle, and closes it on a click on a small screen', async () => {
    setWindowWidth(500)
    const { user } = renderWithProviders(<Header />)

    // react-bootstrap's toggle has no aria-expanded; its 'collapsed' class is the only state it shows.
    const toggle = screen.getByRole('button', { name: 'Toggle navigation' })
    expect(toggle).toHaveClass('collapsed')

    await user.click(toggle)
    expect(toggle).not.toHaveClass('collapsed')

    await user.click(screen.getByRole('link', { name: 'About' }))
    expect(toggle).toHaveClass('collapsed')
  })
})
