/**
 * The endpoints whose data a render read: the build renders each page inside
 * a RenderedEndpoints provider (src/prerender/render.tsx), so that it embeds
 * only that page's data in the page. In the browser there is no provider, and
 * nothing is recorded.
 */
import { createContext } from 'react'

import type { SiteEndpoint } from './api'

export const RenderedEndpoints = createContext<Set<SiteEndpoint> | null>(null)
