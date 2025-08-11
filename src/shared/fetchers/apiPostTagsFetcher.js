import { APP_CONFIG } from '../constants'

function blogApiHeaders() {
  const headers = {
    Accept: 'application/json',
  }

  return headers
}

export async function fetchPostTags() {
  const concept = 'Wordpress Api post tags'
  try {
    const response = await fetch(APP_CONFIG.apis.tags, {
      method: 'GET',
      headers: blogApiHeaders(),
    })
    if (response.ok) {
      const tags = await response.json()
      const retval = tags.map((tag) => {
        return {
          id: tag.id,
          name: tag.name,
        }
      })
      console.debug(`Fetched ${retval.length} post tags`, retval)
      return retval
    } else {
      console.error(`Error fetching ${concept}: ${response.statusText}`)
    }
  } catch (error) {
    console.error(`Error fetching ${concept}:`, error)
  }
  console.error(`Error fetching ${concept}: Not Found`)
  return []
}
