import { APP_CONFIG } from './constants'

export function getCategories(tags) {
  /*
   Maps tag Array.string to one of 5 categories:
   - cloud
   - data-science
   - full-stack
   - openedx
   - react

   tags: Array<string> with values like ['full-stack', 'data-science', 'edx', 'openai', 'ci-cd']
   */
  if (!tags || (typeof tags !== 'string' && !Array.isArray(tags))) {
    return []
  }

  let category = new Set()

  if (!Array.isArray(tags)) {
    tags = [tags]
  }

  tags.forEach((t) => {
    if (t.includes('full-stack') || t.includes('full stack')) {
      category.add(APP_CONFIG.skills.fullStack)
    }
    if (t.includes('wordpress')) {
      category.add(APP_CONFIG.skills.fullStack)
    }
    if (t.includes('data-science') || t.includes('data science')) {
      category.add(APP_CONFIG.skills.dataScience)
    }
    if (t.includes('edx') || t.includes('openedx') || t.includes('open edx')) {
      category.add(APP_CONFIG.skills.openEdx)
    }
    if (t.includes('openai') || t.includes('gpt')) {
      category.add(APP_CONFIG.skills.dataScience)
    }
    if (t.includes('python') || t.includes('pypi') || t.includes('django')) {
      category.add(APP_CONFIG.skills.fullStack)
    }
    if (t.includes('docker')) {
      category.add(APP_CONFIG.skills.fullStack)
      category.add(APP_CONFIG.skills.cloud)
    }
    if (
      t.includes('ci-cd') ||
      t.includes('ci/cd') ||
      t.includes('dev-ops') ||
      t.includes('devops')
    ) {
      category.add(APP_CONFIG.skills.fullStack)
    }
    if (t.includes('chatgpt')) {
      category.add(APP_CONFIG.skills.dataScience)
    }
    if (t.includes('react') || t.includes('reactjs') || t.includes('react.js')) {
      category.add(APP_CONFIG.skills.react)
    }
    if (t.includes('aws') || t.includes('amazon web services')) {
      category.add(APP_CONFIG.skills.cloud)
    }
    if (t.includes('kubernetes')) {
      category.add(APP_CONFIG.skills.cloud)
    }
    if (t.includes('terraform')) {
      category.add(APP_CONFIG.skills.cloud)
    }
    if (t.includes('serverless')) {
      category.add(APP_CONFIG.skills.cloud)
    }
    if (t.includes('microservices')) {
      category.add(APP_CONFIG.skills.cloud)
    }
    if (t.includes('12-factor')) {
      category.add(APP_CONFIG.skills.fullStack)
    }
  })

  return Array.from(category)
}
