const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

/**
 * A WordPress date's month and year, e.g. "Jan-2020" for "2020-01-27T10:00:00".
 * Read from the date's text, not converted to a time zone, so that the build's
 * html (src/prerender/) and every visitor's browser show the same month.
 * Empty when there is no date, or it isn't one.
 */
export function monthYear(date: string | undefined): string {
  const match = /^(\d{4})-(\d{2})/.exec(date ?? '')
  const month = match ? MONTHS[Number(match[2]) - 1] : undefined
  return match && month ? `${month}-${match[1]}` : ''
}
