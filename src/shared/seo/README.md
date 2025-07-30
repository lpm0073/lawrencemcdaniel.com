# Google Structured Data

This folder contains json dicts to be used for Google Structured Data

validate your page here:

- https://search.google.com/test/rich-results
- https://validator.schema.org/

validate your json here: https://json-ld.org/playground/
Google Structured Data: https://developers.google.com/search/docs/guides/intro-structured-data
Developer guide: https://developers.google.com/search/docs/guides/prototype

Google Structured Data Guidelines.
https://developers.google.com/search/docs/guides/sd-policies#quality-guidelines_1
https://developers.google.com/search/docs/advanced/guidelines/webmaster-guidelines
https://nystudio107.com/blog/annotated-json-ld-structured-data-examples

Google-supported data types:
https://developers.google.com/search/docs/data-types/software-app
https://developers.google.com/search/docs/data-types/article
Article
Course
Software App

See the following examples:
https://www.schemaapp.com/how-to/services-schema-markup-schema-org-services/
https://schema.org/Person
https://schema.org/Service
https://schema.org/ProfessionalService
https://schema.org/WebSite

## Google Structured Data source files for this site

### gsdPersonLawrence.js

Person data for Lawrence McDaniel. This is a top-level object that referenced by other objects.

### gsdGraph.js

This is the principal SEO structure. It describes the web site / page / contents hierarchy.

### gsdLocalBusiness.js

Organizational data for the company, lawrencemcdaniel.com

#### gsdKnowsAbout.js

JSON list of technologies, mostly identical in content to the Logo cube.

#### gsdQualifications.js

JSON list of completed courses. Google search seems to misinterpret the data, so not sure if its helpful.

## Google Structured Data source files for blog articles

### gsdHowToInstall.js

Open edX Step-By-Step Production Installation Guide
https://blog.lawrencemcdaniel.com/open-edx-installation/

### gsdHowToScale.js

Scaling Open edX
https://blog.lawrencemcdaniel.com/scaling-open-edx/
