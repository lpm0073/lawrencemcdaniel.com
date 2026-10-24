import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import SkillColumn from './Component'
import SkillBar from './skillBar'
import drawBar from './drawBar'
import drawCircle from './drawCircle'

/** jsdom has no 2D canvas context: a fake that records the drawing calls. */
function fakeContext() {
  return {
    lineWidth: 0,
    strokeStyle: '',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowBlur: 0,
    shadowColor: '',
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    arc: vi.fn(),
    stroke: vi.fn(),
  }
}

let context: ReturnType<typeof fakeContext>

function stubCanvas(width = '120px', height = '60px') {
  context = fakeContext()
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
    context as unknown as CanvasRenderingContext2D
  )
  vi.spyOn(window, 'getComputedStyle').mockReturnValue({
    getPropertyValue: (property: string) => (property === 'width' ? width : height),
  } as CSSStyleDeclaration)
}

describe('skill animations', () => {
  beforeEach(() => {
    vi.useFakeTimers({
      toFake: ['setTimeout', 'requestAnimationFrame', 'cancelAnimationFrame'],
    })
    vi.spyOn(window, 'devicePixelRatio', 'get').mockReturnValue(1)
    stubCanvas()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('SkillColumn shows the skill and animates a circle around the percentage', () => {
    render(
      <SkillColumn
        id="3"
        pct="100"
        title="Frontend"
        icon="fa-html5"
        description="HTML, CSS and JavaScript."
      />
    )

    expect(screen.getByRole('article', { name: 'Frontend' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Frontend' })).toBeInTheDocument()
    expect(screen.getByText('100%')).toBeInTheDocument()
    expect(screen.getByText('HTML, CSS and JavaScript.')).toBeInTheDocument()

    act(() => {
      vi.runAllTimers()
    })

    // the first frame, then one per 2%, up to 100%.
    expect(context.stroke).toHaveBeenCalledTimes(51)
    const lastArc = context.arc.mock.calls.at(-1)
    expect(lastArc).toEqual([60, 30, 50, -Math.PI / 2, Math.PI * 2 - Math.PI / 2, false])
  })

  it('SkillBar shows the description and animates a bar, and stops when unmounted', () => {
    const { unmount } = render(<SkillBar id="1" description="Python" />)
    expect(screen.getByText('Python')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(400)
    })
    expect(context.lineTo).toHaveBeenCalled()
    const strokes = context.stroke.mock.calls.length

    unmount()
    act(() => {
      vi.runAllTimers()
    })
    expect(context.stroke.mock.calls.length).toBeLessThanOrEqual(strokes + 1)
  })

  it('drawBar draws a bar that grows to the full width', () => {
    const canvas = document.createElement('canvas')
    const cancel = drawBar({ current: canvas })

    act(() => {
      vi.runAllTimers()
    })
    expect(canvas.width).toBe(120)
    expect(canvas).toHaveStyle({ width: '120px' })
    expect(context.lineTo.mock.calls.at(-1)).toEqual([120, 0])
    expect(cancel).toBeTypeOf('function')
    cancel?.()
  })

  it('drawCircle can be cancelled before it starts', () => {
    const canvas = document.createElement('canvas')
    const cancel = drawCircle({ current: canvas })
    cancel?.()
    expect(context.stroke).not.toHaveBeenCalled()
  })

  it('does nothing without a canvas or a 2D context', () => {
    expect(drawBar({ current: null })).toBeUndefined()
    expect(drawCircle({ current: null })).toBeUndefined()

    vi.mocked(HTMLCanvasElement.prototype.getContext).mockReturnValue(null)
    const canvas = document.createElement('canvas')
    expect(drawBar({ current: canvas })).toBeUndefined()
    expect(drawCircle({ current: canvas })).toBeUndefined()
  })
})
