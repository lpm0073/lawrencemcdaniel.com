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

export const gsdSoftwareRepoList = (category) => {
  const reduxRepositories = useSelector((state) => state.repositories)

  const fswlRepositories = [
    ...(category
      ? reduxRepositories.repos.filter((redux) => redux.categories.includes(category))
      : reduxRepositories.repos),
  ].map((repo) =>
    gsdSoftwareSourceCode(
      repo.html_url,
      repo.languages[0],
      repo.description + ' ' + repo.topics.join(', ')
    )
  )

  return fswlRepositories
}

export const gsdSoftwareRepoList_Smarter = [
  gsdSoftwareSourceCode(
    'https://github.com/smarter-sh/smarter-vscode-yaml',
    'TypeScript',
    `A Visual Studio Code extension that provides enhanced support for working with Smarter YAML manifest files, similar to Kubernetes manifests. It includes syntax validation, semantic checking, and auto-completion for reserved keywords. A Smarter manifest will include the following two keys at the top of the document:
      apiVersion: smarter.sh/v1
      kind: Chatbot
      Valid manifest 'kind' values: Chatbot, Plugin, Account, SmarterAuthToken, User, Chat, ChatConfig, ChatHistory, ChatPluginUsage, ChatToolCall, SqlConnection, ApiConnection`
  ),
  gsdSoftwareSourceCode(
    'https://github.com/smarter-sh/smarter-python',
    'Python',
    'The Smarter Python library provides convenient access to the Smarter REST API from any Python 3.8+ application. The library includes type definitions for all request params and response fields.'
  ),
  gsdSoftwareSourceCode(
    'https://github.com/smarter-sh/web-integration-example',
    'JavaScript',
    `Demonstrates the basic pattern for integrating a SmarterChat npm component into an existing web page. This is a generic integration pattern that is intended to facilitate plugin tool development for any ecosystem, including for example, Microsoft Dynamics, Microsoft Sharepoint, SAP, salesforce.com, Wordpress, Drupal, Wix, Squarespace, Shopify, and others.
     Injects a lightweight react.js app into the DOM. The app itself is freely downloadable at @smarter.sh/ui-chat, or alternatively you can fork https://github.com/smarter-sh/smarter-chat.`
  ),
  gsdSoftwareSourceCode(
    'https://github.com/smarter-sh/smarter-chat',
    'React',
    'This project contains the source code for the interactive chatbot found in the Smarter web console developer workbench. It integrates natively with Smarter Saas and on-premise installations. You can optionally enable the meta data output behavior found in the Smarter sandbox. See Smarter Technical Overview This project is also suitable for all front-end cross-platform projects. For example, use this code base to create a react.js run-time for use inside of Wordpress plugins, salesforce.com apps, .net components and Sharepoint add-ins.'
  ),
  gsdSoftwareSourceCode(
    'https://github.com/smarter-sh/smarter-infrastructure',
    'Terraform',
    'AWS infrastructure as code for deploying Smarter API.'
  ),
  gsdSoftwareSourceCode(
    'https://github.com/smarter-sh/smarter-cli',
    'Golang',
    'The Smarter command-line interface for working with Smarter resources. Runs on Windows, macOS, Linux and DockerHub. Download it at https://smarter.sh/cli/'
  ),
]
export const gsdSoftwareRepoList_CookieCutterOpenedx = []
