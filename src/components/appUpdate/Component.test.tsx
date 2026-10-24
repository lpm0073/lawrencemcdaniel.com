import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import AppUpdateAlert from './Component'

describe('AppUpdateAlert', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows the message, then hides it and calls back after 5 seconds', () => {
    const callback = vi.fn()
    render(<AppUpdateAlert msg="A new version is available." callback={callback} />)

    expect(screen.getByRole('alert')).toHaveTextContent('A new version is available.')
    expect(callback).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    expect(callback).toHaveBeenCalledTimes(1)
    // the alert fades out.
    act(() => {
      vi.runAllTimers()
    })
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('hides itself without a callback', () => {
    render(<AppUpdateAlert msg="Installed." />)
    expect(screen.getByRole('alert')).toHaveTextContent('Installed.')

    act(() => {
      vi.advanceTimersByTime(5000)
    })
    // the alert fades out.
    act(() => {
      vi.runAllTimers()
    })
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
