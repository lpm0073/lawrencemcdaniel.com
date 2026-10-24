import { describe, expect, it } from 'vitest'

import { monthYear } from './monthYear'

describe('monthYear', () => {
  it("is a WordPress date's month and year, whatever the time zone", () => {
    expect(monthYear('2020-01-27T10:00:00')).toBe('Jan-2020')
    // late on New Year's Eve: still December, in every time zone.
    expect(monthYear('2019-12-31T23:59:59')).toBe('Dec-2019')
  })

  it('is empty without a date', () => {
    expect(monthYear(undefined)).toBe('')
    expect(monthYear('yesterday')).toBe('')
    expect(monthYear('2020-13-01')).toBe('')
  })
})
