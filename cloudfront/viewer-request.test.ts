// @vitest-environment node
/**
 * Tests of the CloudFront Function, loaded as CloudFront loads it: a script
 * whose handler() the runtime calls.
 */
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

interface Querystring {
  [name: string]: { value: string; multiValue?: { value: string }[] }
}

interface Request {
  uri: string
  headers: { host?: { value: string } }
  querystring: Querystring
}

interface Redirect {
  statusCode: number
  headers: { location: { value: string } }
}

const source = readFileSync(new URL('./viewer-request.js', import.meta.url), 'utf8')
const handler = new Function(source + '\nreturn handler')() as (event: {
  request: Request
}) => Request | Redirect

function viewerRequest(
  uri: string,
  host: string | null = 'lawrencemcdaniel.com',
  querystring: Querystring = {}
) {
  const request: Request = {
    uri,
    headers: host === null ? {} : { host: { value: host } },
    querystring,
  }
  return { request, response: handler({ request }) }
}

function location(response: Request | Redirect): string | undefined {
  return 'statusCode' in response && response.statusCode === 301
    ? response.headers.location.value
    : undefined
}

describe('viewer-request CloudFront Function', () => {
  it('passes a canonical url on to S3 unchanged', () => {
    for (const uri of ['/', '/smarter', '/portfolio/feature-article', '/static/x.js']) {
      const { request, response } = viewerRequest(uri)
      expect(response).toBe(request)
    }
  })

  it('treats a request without a Host header as canonical', () => {
    const { request, response } = viewerRequest('/bio', null)
    expect(response).toBe(request)
  })

  it('redirects www and every other host to lawrencemcdaniel.com', () => {
    expect(location(viewerRequest('/smarter', 'www.lawrencemcdaniel.com').response)).toBe(
      'https://lawrencemcdaniel.com/smarter'
    )
    expect(location(viewerRequest('/', 'd1234.cloudfront.net').response)).toBe(
      'https://lawrencemcdaniel.com/'
    )
  })

  it('removes trailing slashes, except from the home page', () => {
    expect(location(viewerRequest('/smarter/').response)).toBe(
      'https://lawrencemcdaniel.com/smarter'
    )
    expect(location(viewerRequest('/portfolio//').response)).toBe(
      'https://lawrencemcdaniel.com/portfolio'
    )
    expect(location(viewerRequest('//').response)).toBe('https://lawrencemcdaniel.com/')
    expect(location(viewerRequest('/www/', 'www.lawrencemcdaniel.com').response)).toBe(
      'https://lawrencemcdaniel.com/www'
    )
  })

  it('redirects pages that moved', () => {
    expect(location(viewerRequest('/full-bio').response)).toBe(
      'https://lawrencemcdaniel.com/bio'
    )
    expect(location(viewerRequest('/full-bio/').response)).toBe(
      'https://lawrencemcdaniel.com/bio'
    )
  })

  it('keeps the query string', () => {
    const { response } = viewerRequest('/smarter/', 'lawrencemcdaniel.com', {
      utm_source: { value: 'whatsapp' },
      tag: { value: 'a', multiValue: [{ value: 'a' }, { value: 'b' }] },
      flag: { value: '' },
    })
    expect(location(response)).toBe(
      'https://lawrencemcdaniel.com/smarter?utm_source=whatsapp&tag=a&tag=b&flag'
    )
  })
})
