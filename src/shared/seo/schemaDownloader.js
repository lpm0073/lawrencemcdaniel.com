import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

import { gsdGraph } from './gsdGraph.js'
import { gsdPersonLawrenceMcDaniel } from './gsdPersonLawrence.js'
import { hasOccupation } from './gsdPersonLawrence.js'
import { gsdSoftwareSourceCodeList } from './gsdSoftwareSourceCode.js'
import { gsdVideoObjectList } from './gsdVideoObject.js'
import { basePageTitle } from './gsdCommon.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const outputPath = join(__dirname, '../../../public/schema.json')


const person = {
  ...gsdPersonLawrenceMcDaniel,
  ...{ hasOccupation: hasOccupation },
}
const slug = ''
const webpageName = basePageTitle
const webpageDescription =
  'Data Scientist, Full Stack Developer, online instructor, and Open edX® Consultant specializing in Python, ReactJS, Kubernetes, Terraform, AWS, and Azure.'
const primaryImageUrl = ''
const pageType = ''
const relatedLink = ''
const graphExtraData = [person, ...gsdSoftwareSourceCodeList, ...gsdVideoObjectList]
const schema = JSON.stringify(gsdGraph(
                slug,
                webpageName,
                webpageDescription,
                primaryImageUrl,
                pageType,
                relatedLink,
                graphExtraData
              )
            )


writeFileSync(outputPath, schema, 'utf8')
