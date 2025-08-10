export function getCategories(tags) {
  /*
   Map tag Array.string to one of 4 categories: full-stack, data-science, react, openedx
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
      category.add('full-stack')
    }
    if (t.includes('wordpress')) {
      category.add('full-stack')
    }
    if (t.includes('edx') || t.includes('openedx') || t.includes('open edx')) {
      category.add('openedx')
    }
    if (t.includes('openai') || t.includes('gpt')) {
      category.add('data-science')
    }
    if (t.includes('python') || t.includes('pypi') || t.includes('django')) {
      category.add('full-stack')
    }
    if (t.includes('docker')) {
      category.add('full-stack')
      category.add('cloud')
    }
    if (
      t.includes('ci-cd') ||
      t.includes('ci/cd') ||
      t.includes('dev-ops') ||
      t.includes('devops')
    ) {
      category.add('full-stack')
    }
    if (t.includes('chatgpt')) {
      category.add('data-science')
    }
    if (t.includes('react') || t.includes('reactjs') || t.includes('react.js')) {
      category.add('react')
    }
    if (t.includes('aws') || t.includes('amazon web services')) {
      category.add('cloud')
    }
    if (t.includes('kubernetes')) {
      category.add('cloud')
    }
    if (t.includes('terraform')) {
      category.add('cloud')
    }
    if (t.includes('serverless')) {
      category.add('cloud')
    }
    if (t.includes('microservices')) {
      category.add('cloud')
    }
    if (t.includes('12-factor')) {
      category.add('full-stack')
    }
  })

  return Array.from(category)
}
