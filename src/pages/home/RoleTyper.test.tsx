import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import RoleTyper from './RoleTyper'
import { DELETING_MS, HOLD_MS, ROLES, TYPING_MS } from './roles'

/** The text the typer shows, without the screen reader's copy. */
function typed(): string {
  return (screen.getByTestId('home-roles-typed').textContent ?? '').replace(/^> /, '')
}

function prefersReducedMotion(reduce: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({ matches: reduce }))
  )
}

describe('RoleTyper', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('first shows the first role, and gives screen readers every role', () => {
    prefersReducedMotion(false)
    render(<RoleTyper />)

    expect(typed()).toBe(ROLES[0])
    expect(screen.getByText(ROLES.join(', '))).toHaveClass('visually-hidden')
  })

  it('deletes the role and types the next one', () => {
    prefersReducedMotion(false)
    render(<RoleTyper />)

    act(() => vi.advanceTimersByTime(HOLD_MS + DELETING_MS * (ROLES[0].length - 1)))
    expect(typed()).toBe('')

    act(() => vi.advanceTimersByTime(TYPING_MS * ROLES[1].length))
    expect(typed()).toBe(ROLES[1])

    // it holds the role, then starts deleting it
    act(() => vi.advanceTimersByTime(HOLD_MS - 1))
    expect(typed()).toBe(ROLES[1])
    act(() => vi.advanceTimersByTime(1))
    expect(typed()).toBe(ROLES[1].slice(0, -1))
  })

  it('goes back to the first role after the last', () => {
    prefersReducedMotion(false)
    render(<RoleTyper />)

    let elapsed = HOLD_MS + DELETING_MS * (ROLES[0].length - 1)
    for (let i = 1; i < ROLES.length; i++) {
      elapsed +=
        TYPING_MS * ROLES[i].length + HOLD_MS + DELETING_MS * (ROLES[i].length - 1)
    }
    act(() => vi.advanceTimersByTime(elapsed + TYPING_MS * ROLES[0].length))
    expect(typed()).toBe(ROLES[0])
  })

  it('stays still for a visitor who asks for reduced motion', () => {
    prefersReducedMotion(true)
    render(<RoleTyper />)

    act(() => vi.advanceTimersByTime(HOLD_MS * 10))
    expect(typed()).toBe(ROLES[0])
  })

  it('stops typing when it unmounts', () => {
    prefersReducedMotion(false)
    const { unmount } = render(<RoleTyper />)
    unmount()

    expect(vi.getTimerCount()).toBe(0)
  })
})
