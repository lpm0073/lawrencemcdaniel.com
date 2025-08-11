import React from 'react'
import { Provider } from 'react-redux'
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { renderToStaticMarkup } from 'react-dom/server'

import { ConfigureStore } from '../../redux/configureStore.js'
import { gsdGraph } from '../seo/gsdGraph.js'
import { gsdPersonLawrenceMcDaniel, hasOccupation } from '../seo/gsdPersonLawrence.js'
import { gsdSoftwareRepoList } from '../seo/gsdSoftwareSourceCode.js'
import { gsdVideoObjectList } from '../seo/gsdVideoObject.js'
import { basePageTitle } from '../seo/gsdCommon.js'

const store = ConfigureStore()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const outputPath = join(__dirname, '../../../public/schema.json')

function SchemaComponent() {
  const person = {
    ...gsdPersonLawrenceMcDaniel,
    hasOccupation,
  }
  const slug = ''
  const webpageName = basePageTitle
  const webpageDescription =
    'Data Scientist, Full Stack Developer, online instructor, and Open edX® Consultant specializing in Python, ReactJS, Kubernetes, Terraform, AWS, and Azure.'
  const primaryImageUrl = ''
  const pageType = ''
  const relatedLink = ''
  const graphExtraData = [person, ...gsdSoftwareRepoList(), ...gsdVideoObjectList]
  const schema = gsdGraph(
    slug,
    webpageName,
    webpageDescription,
    primaryImageUrl,
    pageType,
    relatedLink,
    graphExtraData
  )
  return React.createElement('script', {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: { __html: JSON.stringify(schema, null, 2) },
  })
}

const markup = renderToStaticMarkup(
  React.createElement(Provider, { store }, React.createElement(SchemaComponent))
)

const jsonMatch = markup.match(/<script[^>]*>([\s\S]*?)<\/script>/)
const json = jsonMatch ? jsonMatch[1] : '{}'

writeFileSync(outputPath, json, 'utf8')
