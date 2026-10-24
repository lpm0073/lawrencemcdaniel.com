import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import AppUpdateAlert from './Component'

describe('AppUpdateAlert', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows its title and message, then hides and calls back after 5 seconds', () => {
    const callback = vi.fn()
    render(
      <AppUpdateAlert
        variant="updating"
        title="Update available"
        msg="A new version is available."
        callback={callback}
      />
    )

    const notice = screen.getByRole('status')
    expect(notice).toHaveTextContent('Update available')
    expect(notice).toHaveTextContent('A new version is available.')
    expect(notice).toHaveClass('app-update-updating')
    expect(callback).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    expect(callback).toHaveBeenCalledTimes(1)
    // the notice fades out.
    act(() => {
      vi.runAllTimers()
    })
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('shows the updated style, and hides itself without a callback', () => {
    render(<AppUpdateAlert variant="updated" title="Site updated" msg="Installed." />)
    const notice = screen.getByRole('status')
    expect(notice).toHaveTextContent('Installed.')
    expect(notice).toHaveClass('app-update-updated')

    act(() => {
      vi.advanceTimersByTime(5000)
    })
    act(() => {
      vi.runAllTimers()
    })
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('closes early when the visitor closes it, and calls back only once', () => {
    const callback = vi.fn()
    render(
      <AppUpdateAlert
        variant="updated"
        title="Site updated"
        msg="Done."
        callback={callback}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(callback).toHaveBeenCalledTimes(1)

    act(() => {
      vi.runAllTimers()
    })
    expect(callback).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('stops its timer when it unmounts', () => {
    const callback = vi.fn()
    const { unmount } = render(
      <AppUpdateAlert variant="updating" title="Update" msg="Soon." callback={callback} />
    )
    unmount()
    act(() => {
      vi.runAllTimers()
    })
    expect(callback).not.toHaveBeenCalled()
  })

  it('stays open with seconds={0}, and its action runs and closes it', () => {
    const callback = vi.fn()
    const onClick = vi.fn()
    render(
      <AppUpdateAlert
        variant="updated"
        title="Site updated"
        msg="Reload to see it."
        seconds={0}
        action={{ label: 'Reload', onClick }}
        callback={callback}
      />
    )

    act(() => {
      vi.advanceTimersByTime(60_000)
    })
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(callback).not.toHaveBeenCalled()

    fireEvent.click(screen.getByRole('button', { name: 'Reload' }))
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledTimes(1)
    act(() => {
      vi.runAllTimers()
    })
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})
