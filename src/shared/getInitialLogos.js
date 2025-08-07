import { shuffleArray } from './shuffle'

export const getInitialLogos = () => {
  return shuffleArray([
    'assets/images/amazon-web-services.png',
    'assets/images/django-logo-300x137.png',
    'assets/images/open-edx.png',
    'assets/images/react-logo-300x261.png',
    'assets/images/mit-idss-logo-230x141.jpg',
    'assets/images/kubernetes-logo-513x261.png',
  ])
}
