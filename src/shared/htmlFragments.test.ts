// @vitest-environment node
import { describe, expect, it } from 'vitest'

import { decodeEntities, paragraphHtml } from './htmlFragments'

describe('paragraphHtml', () => {
  const html =
    '\n<p class="title">Founder &amp; CEO</p>\n<p class="date extra">2020</p>\n' +
    '<P class="x description">Great <b>work</b>,\nreally.</P>'

  it('reads the first paragraph', () => {
    expect(paragraphHtml(html)).toBe('Founder &amp; CEO')
  })

  it('reads the first paragraph with a class, among others', () => {
    expect(paragraphHtml(html, 'date')).toBe('2020')
    expect(paragraphHtml(html, 'extra')).toBe('2020')
    expect(paragraphHtml(html, 'description')).toBe('Great <b>work</b>,\nreally.')
  })

  it('is null when there is no such paragraph', () => {
    expect(paragraphHtml('<div>none</div>')).toBeNull()
    expect(paragraphHtml(html, 'relationship')).toBeNull()
    // a class whose name only contains the one asked for.
    expect(paragraphHtml('<p class="subtitle">x</p>', 'title')).toBeNull()
  })
})

describe('decodeEntities', () => {
  it('decodes numeric character references, decimal and hex', () => {
    expect(decodeEntities('&#8220;quoted&#8221; 3&#8243; &#x2019;')).toBe('“quoted” 3″ ’')
  })

  it('decodes the named references that WordPress writes', () => {
    expect(
      decodeEntities('a &amp; b &lt;i&gt; &quot;c&quot; &hellip; &ndash; &NBSP;')
    ).toBe('a & b <i> "c" … – \u00a0')
  })

  it('keeps references it does not know, and invalid code points, as they are', () => {
    expect(decodeEntities('&unknown; &#0; &#x110000; &copy')).toBe(
      '&unknown; &#0; &#x110000; &copy'
    )
  })
})
