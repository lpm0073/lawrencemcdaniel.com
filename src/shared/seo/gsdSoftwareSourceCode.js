import { useSelector } from 'react-redux'

import { APP_CONFIG } from '../constants.js'

export const gsdSoftwareSourceCode = (url, programming_language, description) => {
  // example: https://github.com/FullStackWithLawrence/openai-embeddings
  const name = url.split('/').filter(Boolean).pop()
  return {
    '@type': 'SoftwareSourceCode',
    '@id': url + '#software-source-code',
    name: name,
    codeRepository: url,
    author: {
      '@type': 'Person',
      '@id': APP_CONFIG.schema.me,
    },
    programmingLanguage: programming_language,
    description: description,
  }
}

export const gsdSoftwareRepoList = (skill) => {
  const reduxRepositories = useSelector((state) => state.repositories)
  const repos = reduxRepositories.repos ? reduxRepositories.repos : []

  return [...(skill ? repos.filter((repo) => repo.skills.includes(skill)) : repos)].map(
    (repo) =>
      gsdSoftwareSourceCode(
        repo.html_url,
        repo.languages[0],
        repo.description + ' ' + repo.topics.join(', ')
      )
  )
}
