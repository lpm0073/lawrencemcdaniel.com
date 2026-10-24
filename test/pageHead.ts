/**
 * Helpers for asserting a page's react-helmet head data.
 *
 *   const graph = await waitForCanonical('https://lawrencemcdaniel.com/cloud')
 *   expect(graph).toEqual(expect.arrayContaining([expect.objectContaining({ '@type': 'WebPage' })]))
 *
 * Helmet applies its changes asynchronously, so waitForCanonical() waits until the
 * page's canonical link is in Helmet's state, then returns the '@graph' of the page's
 * JSON-LD script.
 */
import { waitFor } from '@testing-library/react'
import { expect } from 'vitest'
import { Helmet } from 'react-helmet'

import type { JsonLd } from '../src/shared/seo/gsdGraph'

interface HelmetTag {
  [attribute: string]: string | undefined
}

/**
 * Helmet.peek()'s state. @types/react-helmet types the tags as DOM elements, but they are
 * plain objects of the tags' attributes (including ones like property that elements lack).
 */
export function helmetHead() {
  const head = Helmet.peek()
  return {
    title: head.title,
    linkTags: head.linkTags as unknown as HelmetTag[],
    metaTags: head.metaTags as unknown as HelmetTag[],
    scriptTags: head.scriptTags as unknown as HelmetTag[],
  }
}

/** The '@graph' of the head's application/ld+json script. */
export function jsonLdGraph(): JsonLd[] {
  const script = helmetHead().scriptTags.find((tag) => tag.type === 'application/ld+json')
  expect(script?.innerHTML).toBeDefined()
  const data = JSON.parse(script?.innerHTML ?? '{}') as { '@graph': JsonLd[] }
  return data['@graph']
}

export async function waitForCanonical(href: string): Promise<JsonLd[]> {
  await waitFor(() =>
    expect(helmetHead().linkTags).toEqual(
      expect.arrayContaining([expect.objectContaining({ rel: 'canonical', href })])
    )
  )
  return jsonLdGraph()
}

/** The content of the head's <meta name=...> or <meta property=...> tag. */
export function metaContent(nameOrProperty: string): string | undefined {
  return helmetHead().metaTags.find(
    (tag) => tag.name === nameOrProperty || tag.property === nameOrProperty
  )?.content
}
