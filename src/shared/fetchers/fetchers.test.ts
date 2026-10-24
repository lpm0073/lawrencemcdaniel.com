import { http, HttpResponse } from 'msw'
import { describe, expect, it, vi } from 'vitest'

import { makeMedia, makePost } from '../../../test/fixtures'
import { server } from '../../../test/server'
import { APP_CONFIG } from '../constants'
import { imagePreFetcher } from './imagePrefetcher'

const IMAGE =
  'https://cdn.lawrencemcdaniel.com/wp-content/uploads/black-logo-300x126.webp'

async function cachedImage(url = IMAGE) {
  const cache = await caches.open(APP_CONFIG.caching.names.cdn)
  return cache.match(url)
}

describe('imagePreFetcher', () => {
  it('caches each featured image that is not cached yet', async () => {
    let requests = 0
    server.use(
      http.get(IMAGE, () => {
        requests += 1
        return new HttpResponse('image')
      })
    )

    await imagePreFetcher([makePost(), makePost({ _embedded: undefined })], 'Test')
    await imagePreFetcher([makePost()], 'Test')

    expect(requests).toBe(1)
    expect(await cachedImage()).toBeDefined()
  })

  it('skips images that are not on the CDN', async () => {
    // api.lawrencemcdaniel.com serves no CORS header, so fetch() would fail. MSW
    // fails the test if anything is requested: there are no handlers.
    const onWordPress = makeMedia({
      source_url: 'https://api.lawrencemcdaniel.com/wp-content/uploads/openai.png',
      media_details: {},
    })

    await imagePreFetcher(
      [
        makePost({ _embedded: { 'wp:featuredmedia': [onWordPress] } }),
        { source_url: 'not a url' },
      ],
      'Test'
    )

    const cache = await caches.open(APP_CONFIG.caching.names.cdn)
    expect(await cache.match(onWordPress.source_url)).toBeUndefined()
  })

  it("doesn't cache a failed response", async () => {
    server.use(http.get(IMAGE, () => new HttpResponse(null, { status: 404 })))

    await imagePreFetcher([makePost()], 'Test')

    expect(await cachedImage()).toBeUndefined()
  })

  it('logs a network error and carries on', async () => {
    server.use(http.get(IMAGE, () => HttpResponse.error()))
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})

    await imagePreFetcher([makePost()], 'Test')

    expect(error).toHaveBeenCalledWith(
      `imagePreFetcher() failed: Test - ${IMAGE}`,
      expect.any(TypeError)
    )
  })
})
