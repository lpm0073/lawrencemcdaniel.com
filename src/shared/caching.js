import { CACHE_EXPIRATION_MS } from './constants'

export function setCacheTimestamp(url) {
  localStorage.setItem(`img-cache-${url}`, Date.now())
}

export function isCacheExpired(url) {
  const ts = localStorage.getItem(`img-cache-${url}`)
  if (!ts) return true
  return (Date.now() - Number(ts)) > CACHE_EXPIRATION_MS
}
