import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { APP_CONFIG } from '../shared/constants'
import { prefetchSiteData } from '../redux/api'
import { useAppDispatch } from '../redux/hooks'

// Pages
import Home from '../pages/home/Component'
import Consulting from '../pages/consulting/Component'
import Contact from '../pages/contact/Component'
import QR from '../pages/qr/Component'
import About from '../pages/about/Component'
import Bio from '../pages/bio/Component'
import Specialties from '../pages/specialties/Component'
import Portfolio from '../pages/portfolio/Component'
import PortfolioDetail from '../pages/portfolioDetail/Component'
import Education from '../pages/education/Component'
import Fullstack from '../pages/fullstack/Component'
import CloudComputing from '../pages/cloud/Component'
import Clients from '../pages/clients/Component'
import Datascience from '../pages/dataScience/Component'
import ImageTaggerPage from '../pages/imageTagging/Component'
import ReactPage from '../pages/react/Component'
import Openedx from '../pages/openedx/Component'
import PageNotFound from '../pages/notFound/Component'
import MRLPage from '../pages/mdr/Component'

/**
 * Every route of the site. Each page loads the data it shows itself, with the
 * hooks in src/redux/hooks.ts; this component only starts loading all of it
 * when the app starts (prefetchSiteData), so that pages are ready, with their
 * images, before they are visited. It doesn't read the store, so it never
 * re-renders a page.
 */
export default function SiteRoutes() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(prefetchSiteData())
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/consulting" element={<Consulting />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/qr" element={<QR />} />
      <Route path="/about" element={<About />} />
      <Route path="/image-tagging" element={<ImageTaggerPage />} />
      <Route path="/bio" element={<Bio />} />
      <Route path="/full-bio" element={<Navigate to="/bio" />} />
      <Route path="/specialties" element={<Specialties />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/portfolio/:portfolioId" element={<PortfolioDetail />} />
      <Route path="/education" element={<Education />} />
      <Route path={'/' + APP_CONFIG.skills.openEdx} element={<Openedx />} />
      <Route path={'/' + APP_CONFIG.skills.dataScience} element={<Datascience />} />
      <Route path={'/' + APP_CONFIG.skills.fullStack} element={<Fullstack />} />
      <Route path={'/' + APP_CONFIG.skills.cloud} element={<CloudComputing />} />
      <Route path={'/' + APP_CONFIG.skills.react} element={<ReactPage />} />
      <Route path="/react-mdr" element={<MRLPage />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}
