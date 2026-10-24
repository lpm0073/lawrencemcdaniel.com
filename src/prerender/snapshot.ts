/**
 * A prerendered page's data (SiteDataSnapshot), embedded in the page as a
 * <script type="application/json"> element, which main.tsx reads to seed the
 * store before the app hydrates the page's html.
 */
import type { SiteDataSnapshot } from '../redux/api'

export const SNAPSHOT_ELEMENT_ID = 'site-data'

/**
 * The <script> element that carries snapshot. Every "<" is escaped, so that
 * no text in the data (e.g. "</script>" in a post) can end the element.
 */
export function snapshotScript(snapshot: SiteDataSnapshot): string {
  const json = JSON.stringify(snapshot).replace(/</g, '\\u003c')
  return `<script id="${SNAPSHOT_ELEMENT_ID}" type="application/json">${json}</script>`
}

/** The page's snapshot, or null when it has none (the dev server) or it can't be read. */
export function readSnapshot(doc: Document): SiteDataSnapshot | null {
  const text = doc.getElementById(SNAPSHOT_ELEMENT_ID)?.textContent
  if (!text) return null
  try {
    const snapshot: unknown = JSON.parse(text)
    return typeof snapshot === 'object' && snapshot !== null && !Array.isArray(snapshot)
      ? (snapshot as SiteDataSnapshot)
      : null
  } catch (error) {
    console.error('readSnapshot() could not parse the page data', error)
    return null
  }
}
