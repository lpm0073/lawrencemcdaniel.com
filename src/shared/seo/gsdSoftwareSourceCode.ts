import { APP_CONFIG } from '../constants.js'
import type { Repository } from '../../types'

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

/**
 * Returns schema.org SoftwareSourceCode objects for the GitHub repositories,
 * optionally only those with a skill.
 * @param repositories - e.g. useRepositories().data.
 * @param skill - a skill slug to filter by, e.g. APP_CONFIG.skills.fullStack.
 */
export const gsdSoftwareRepoList = (repositories: Repository[], skill?: string) => {
  const repos = repositories

  return [...(skill ? repos.filter((repo) => repo.skills.includes(skill)) : repos)].map(
    (repo) =>
      gsdSoftwareSourceCode(
        repo.html_url,
        repo.languages[0]?.name,
        repo.description + ' ' + repo.topics.join(', ')
      )
  )
}
