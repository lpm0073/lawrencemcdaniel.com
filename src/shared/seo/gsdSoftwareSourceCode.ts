import { useSelector } from 'react-redux'

import { APP_CONFIG } from '../constants.js'
import type { RootState } from '../../redux/configureStore'

export const gsdSoftwareSourceCode = (
  url: string,
  programming_language: string | undefined,
  description: string
) => {
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

export const gsdSoftwareRepoList = (skill?: string) => {
  // This is only called while a function component renders, so the hook is safe;
  // the name cannot change without changing the export.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const reduxRepositories = useSelector((state: RootState) => state.repositories)
  const repos = reduxRepositories.repos ? reduxRepositories.repos : []

  return [...(skill ? repos.filter((repo) => repo.skills.includes(skill)) : repos)].map(
    (repo) =>
      gsdSoftwareSourceCode(
        repo.html_url,
        repo.languages[0]?.name,
        repo.description + ' ' + repo.topics.join(', ')
      )
  )
}
