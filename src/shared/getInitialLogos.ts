/**
 * The logos that the logo cube and the technology carousel show before the
 * WordPress logos load. Always in the same order, never shuffled: the build
 * prerenders the pages (src/prerender/), and a page's first render in the
 * browser must match its html for React to hydrate it. The components
 * shuffle their logos once they have mounted.
 */
export const getInitialLogos = (): string[] => [
  'assets/images/django-logo-300x137.png',
  'assets/images/open-edx.png',
  'assets/images/react-logo-300x261.png',
  'assets/images/mit-idss-logo-230x141.jpg',
  'assets/images/kubernetes-logo-513x261.png',
  'assets/images/aws-logo.png',
  'assets/images/openai-logo.png',
  'assets/images/python-logo.png',
]
