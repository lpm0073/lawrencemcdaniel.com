/** A canvas context, with the vendor-prefixed backing store ratios that older browsers had. */
type LegacyCanvasContext = CanvasRenderingContext2D & {
  backingStorePixelRatio?: number
  webkitBackingStorePixelRatio?: number
  mozBackingStorePixelRatio?: number
  msBackingStorePixelRatio?: number
  oBackingStorePixelRatio?: number
}

export const getPixelRatio = (context: CanvasRenderingContext2D): number => {
  const legacy = context as LegacyCanvasContext
  const backingStore =
    legacy.backingStorePixelRatio ||
    legacy.webkitBackingStorePixelRatio ||
    legacy.mozBackingStorePixelRatio ||
    legacy.msBackingStorePixelRatio ||
    legacy.oBackingStorePixelRatio ||
    1

  return (window.devicePixelRatio || 1) / backingStore
}
