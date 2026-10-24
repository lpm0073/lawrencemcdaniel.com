/**
 * Read parts of a WordPress post's html (content.rendered) without a DOM, so
 * that pages render the same in Node, when the build prerenders them
 * (src/prerender/), as in browsers. The posts that the site reads this way
 * hold flat paragraphs, e.g. a recommendation's <p class="title">...</p>.
 */

/** The inner html of html's first <p>, or of its first <p class="className">, or null. */
export function paragraphHtml(html: string, className?: string): string | null {
  const opening = className
    ? `<p\\b[^>]*\\bclass="(?:[^"]*\\s)?${className}(?:\\s[^"]*)?"[^>]*>`
    : '<p\\b[^>]*>'
  return html.match(new RegExp(opening + '([\\s\\S]*?)</p>', 'i'))?.[1] ?? null
}

/** The named character references that WordPress writes. */
const NAMED: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  hellip: '…',
  ndash: '–',
  mdash: '—',
  lsquo: '‘',
  rsquo: '’',
  ldquo: '“',
  rdquo: '”',
}

/** html's text with its character references decoded, e.g. "&#8220;" to "“". Tags are kept. */
export function decodeEntities(html: string): string {
  return html.replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi, (reference, name: string) => {
    if (name[0] === '#') {
      const code =
        name[1] === 'x' || name[1] === 'X'
          ? parseInt(name.slice(2), 16)
          : parseInt(name.slice(1), 10)
      return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : reference
    }
    return NAMED[name.toLowerCase()] ?? reference
  })
}
