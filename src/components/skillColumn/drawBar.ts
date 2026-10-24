import type { RefObject } from 'react'

import { getPixelRatio } from '../../shared/getPixelRatio'

const drawBar = (ref: RefObject<HTMLCanvasElement | null>) => {
  const canvas = ref.current
  if (!canvas) return
  const context = canvas.getContext('2d')
  if (!context) return

  const ratio = getPixelRatio(context)
  const width = getComputedStyle(canvas).getPropertyValue('width').slice(0, -2)
  const height = getComputedStyle(canvas).getPropertyValue('height').slice(0, -2)

  canvas.width = Number(width) * ratio
  canvas.height = Number(height) * ratio
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`

  context.lineWidth = canvas.height * 2
  context.strokeStyle = '#666'
  context.shadowOffsetX = 0
  context.shadowOffsetY = 0
  context.shadowBlur = 0
  context.shadowColor = '#656565'

  const x = canvas.width
  const y = canvas.height
  const endPercent = 100
  let i = 0
  let requestId: number | undefined

  const render = (pct: number) => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.beginPath()

    context.moveTo(0, y)
    context.lineTo(x * pct, 0)

    context.stroke()
    i += 2

    if (i <= endPercent) {
      requestId = requestAnimationFrame(function () {
        render(i / 100)
      })
    }
  }

  // the first frame draws nothing, as when render() was called with no argument.
  setTimeout(function () {
    render(NaN)
  }, Math.random() * 300)

  return () => {
    if (requestId !== undefined) cancelAnimationFrame(requestId)
  }
}

export default drawBar
