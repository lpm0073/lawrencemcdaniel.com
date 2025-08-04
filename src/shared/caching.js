import { CACHE_EXPIRATION_IMAGES } from './constants'

export function setCacheTimestamp(url) {
  localStorage.setItem(`img-cache-${url}`, Date.now())
}

export function isCacheExpired(url, expiration = CACHE_EXPIRATION_IMAGES) {
  const ts = localStorage.getItem(`img-cache-${url}`)
  if (!ts) return true
  return (Date.now() - Number(ts)) > expiration
}
