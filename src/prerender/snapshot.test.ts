import { afterEach, describe, expect, it, vi } from 'vitest'

import { makeRepository } from '../../test/fixtures'
import { readSnapshot, snapshotScript, SNAPSHOT_ELEMENT_ID } from './snapshot'

/** Put html in the document's body, as a page carries it. */
function page(html: string): Document {
  document.body.innerHTML = html
  return document
}

describe('the page data snapshot', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('round-trips through the page', () => {
    const snapshot = { getRepositories: [makeRepository({ name: 'one' })] }
    expect(readSnapshot(page(snapshotScript(snapshot)))).toEqual(snapshot)
  })

  it('escapes "<", so that no data can end its <script> element', () => {
    const script = snapshotScript({
      getRepositories: [makeRepository({ description: '</script><script>alert(1)' })],
    })
    expect(script.match(/<\/script>/g)).toHaveLength(1)
    expect(script).toContain('\\u003c/script>')
    const description = readSnapshot(page(script))?.getRepositories?.[0].description
    expect(description).toBe('</script><script>alert(1)')
  })

  it('is null when the page has none, e.g. on the dev server', () => {
    expect(readSnapshot(page('<div id="root"></div>'))).toBeNull()
    expect(readSnapshot(page(`<script id="${SNAPSHOT_ELEMENT_ID}"></script>`))).toBeNull()
  })

  it('is null when it is not an object', () => {
    for (const json of ['[]', 'null', '"text"']) {
      const doc = page(
        `<script id="${SNAPSHOT_ELEMENT_ID}" type="application/json">${json}</script>`
      )
      expect(readSnapshot(doc)).toBeNull()
    }
  })

  it('is null, and says so, when it is not JSON', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})
    const doc = page(
      `<script id="${SNAPSHOT_ELEMENT_ID}" type="application/json">{oops</script>`
    )
    expect(readSnapshot(doc)).toBeNull()
    expect(error).toHaveBeenCalledWith(
      expect.stringContaining('readSnapshot()'),
      expect.any(Error)
    )
  })
})
