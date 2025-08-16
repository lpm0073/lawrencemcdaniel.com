import React from 'react'
import PropTypes from 'prop-types'

import RenderPageTitle from '../../components/pagetitle/pageTitleComponent'
import RecommendationsCarousel from './recommendationsCarousel'
import ClientGrid from '../../components/clientGrid/Component'
import { Helmet } from 'react-helmet'
import { gsdGraph } from '../../shared/seo/gsdGraph'
import { gsdPersonLawrenceMcDaniel } from '../../shared/seo/gsdPersonLawrence'
import { hasOccupation } from '../../shared/seo/gsdPersonLawrence'
import { APP_CONFIG } from '../../shared/constants'

import './styles.css'

const Clients = (props) => {
  /* Google Structured Data */
  const slug = 'clients'
  const webpageName = 'Clients'
  const webpageDescription =
    'Lawrence McDaniel client list for my Full Stack Developer practice.'
  const primaryImageUrl = ''
  const pageType = ''
  const relatedLink = ''
  const person = {
    ...gsdPersonLawrenceMcDaniel,
    ...{ hasOccupation: hasOccupation },
  }

  const graphExtraData = [person]

  return (
    <React.Fragment>
      <Helmet>
        <link rel="canonical" href={APP_CONFIG.urls.site + '/clients'} />
        <meta name="description" content="Lawrence McDaniel - Clients" />
        <script type="application/ld+json">
          {JSON.stringify(
            gsdGraph(
              slug,
              webpageName,
              webpageDescription,
              primaryImageUrl,
              pageType,
              relatedLink,
              graphExtraData
            )
          )}
        </script>
      </Helmet>
      <main key="client-page" className="recommendations-page" aria-label="Clients Page">
        <div className="site-page ">
          <RenderPageTitle
            theme="dark"
            icon="fa-users"
            title="MY"
            boxed_title="CLIENTS"
          />
          <RecommendationsCarousel recommendations={props.recommendations} />
          <ClientGrid clients={props.clients} />
        </div>
      </main>
    </React.Fragment>
  )
}

Clients.propTypes = {
  recommendations: PropTypes.arrayOf(PropTypes.object).isRequired,
  clients: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Clients
