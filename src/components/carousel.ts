/**
 * react-multi-carousel's Carousel. Import it from here, not from the package:
 * the package is CommonJS only, and Vite's dev server imports its default as
 * the whole module object rather than the component (see interopDefault).
 * eslint.config.js forbids importing the package anywhere else.
 */
// eslint-disable-next-line no-restricted-imports -- the one place that may import the package
import CarouselImport from 'react-multi-carousel'

import { interopDefault } from '../shared/interopDefault'

const Carousel = interopDefault(CarouselImport)

export default Carousel
