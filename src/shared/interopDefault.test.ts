import { describe, expect, it } from 'vitest'

import Carousel from '../components/carousel'
import { interopDefault } from './interopDefault'

function Component() {
  return null
}

describe('interopDefault', () => {
  it("returns a CommonJS module's default export, as Vite's dev server imports it", () => {
    const exportsObject = { __esModule: true, default: Component }
    expect(interopDefault(exportsObject as unknown as typeof Component)).toBe(Component)
  })

  it('returns an import that is already the default export, as the build imports it', () => {
    expect(interopDefault(Component)).toBe(Component)
  })

  it('leaves other values alone', () => {
    expect(interopDefault(null)).toBeNull()
    const settings = { visible: true }
    expect(interopDefault(settings)).toBe(settings)
  })
})

describe('the Carousel shim', () => {
  it('is the react-multi-carousel component, not its module object', () => {
    expect(typeof Carousel).toBe('function')
  })
})
