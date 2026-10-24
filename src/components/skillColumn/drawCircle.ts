import type { RefObject } from 'react'

import { getPixelRatio } from '../../shared/getPixelRatio'

const drawCircle = (ref: RefObject<HTMLCanvasElement | null>) => {
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

  context.lineWidth = 10
  context.strokeStyle = '#666'
  context.shadowOffsetX = 0
  context.shadowOffsetY = 0
  context.shadowBlur = 0
  context.shadowColor = '#656565'

  const x = canvas.width / 2
  const y = canvas.height / 2
  const radius = x - context.lineWidth
  const endPercent = 100
  const circ = Math.PI * 2
  const quart = Math.PI / 2
  let i = 0
  let requestId: number | undefined

  const render = (current: number) => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.beginPath()
    context.arc(x, y, radius, -quart, circ * current - quart, false)
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

export default drawCircle
