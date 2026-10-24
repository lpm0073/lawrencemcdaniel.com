/**
 * The default export of a CommonJS package that was compiled from ES modules
 * (one that sets exports.__esModule and exports.default).
 *
 * Importing such a package's default gives different things in different
 * places: Vite's production build and Vitest give exports.default, but Vite's
 * dev server gives the whole exports object. Rendering that object as a
 * component fails with "Element type is invalid ... but got: object". This
 * returns exports.default in both cases.
 */
export function interopDefault<T>(imported: T): T {
  if (imported !== null && typeof imported === 'object' && 'default' in imported) {
    return (imported as { default: T }).default
  }
  return imported
}
