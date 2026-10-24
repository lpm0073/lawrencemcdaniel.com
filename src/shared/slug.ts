export const convertToSlug = (Text: string): string => {
  return Text.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
}
