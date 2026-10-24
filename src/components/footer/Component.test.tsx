import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it } from 'vitest'

import packageJson from '../../../package.json'
import Footer from './Component'
import SourceCode from './sourceCodeComponent'

describe('Footer', () => {
  it('shows the copyright years and the versions the site is built with', () => {
    render(<Footer />)

    const footer = screen.getByRole('contentinfo')
    const year = new Date().getFullYear()
    expect(footer).toHaveTextContent(`© Copyright 2015 - ${year}.`)
    expect(footer).toHaveTextContent(`v${packageJson.version}`)
    expect(footer).toHaveTextContent(`ReactJS ${React.version}`)
    expect(footer).toHaveTextContent(
      `Redux ${packageJson.dependencies.redux.replace(/[^0-9.]/g, '')}`
    )
    expect(screen.getByRole('link', { name: 'source' })).toHaveAttribute(
      'href',
      'https://github.com/lpm0073/lawrencemcdaniel.com'
    )
  })
})

describe('SourceCode', () => {
  it('links to the repository', () => {
    render(<SourceCode />)
    expect(
      screen.getByRole('link', {
        name: 'https://github.com/lpm0073/lawrencemcdaniel.com/',
      })
    ).toHaveAttribute('target', '_blank')
  })
})
