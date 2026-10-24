import type { WPTag } from '../../types'
import { APP_CONFIG } from '../constants'

function blogApiHeaders(): HeadersInit {
  return {
    Accept: 'application/json',
  }
}

export async function fetchPostTags(): Promise<WPTag[]> {
  const concept = 'Wordpress Api post tags'
  try {
    const response = await fetch(APP_CONFIG.apis.tags, {
      method: 'GET',
      headers: blogApiHeaders(),
    })
    if (response.ok) {
      const tags: WPTag[] = await response.json()
      return tags.map((tag) => ({
        id: tag.id,
        name: tag.name,
      }))
    } else {
      console.error(`Error fetching ${concept}: ${response.statusText}`)
    }
  } catch (error) {
    console.error(`Error fetching ${concept}:`, error)
  }
  console.error(`Error fetching ${concept}: Not Found`)
  return []
}
