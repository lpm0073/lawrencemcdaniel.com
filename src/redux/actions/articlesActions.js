import * as ActionTypes from '../ActionTypes.js'
import { getCategories } from '../../shared/categories'

import { APP_CONFIG } from '../../shared/constants.js'

const articlesLoading = () => ({
  type: ActionTypes.ARTICLES_LOADING,
})

const articlesFailed = (errmess) => ({
  type: ActionTypes.ARTICLES_FAILED,
  payload: errmess,
})

const addArticles = (articles) => {
  let payload
  if (Array.isArray(articles)) {
    payload = articles.map((article) => ({
      ...article,
      skills: getCategories(article.categories),
    }))
  } else {
    // not an array, so raise an error
    throw new Error('Expected articles to be an array')
  }

  return {
    type: ActionTypes.ADD_ARTICLES,
    payload,
  }
}

export const fetchArticles = () => async (dispatch) => {
  dispatch(articlesLoading())

  try {
    const cache = await caches.open(APP_CONFIG.caching.names.api)
    const cachedResponse = await cache.match(APP_CONFIG.apis.articles)

    let articles
    if (cachedResponse) {
      articles = await cachedResponse.json()
    } else {
      const response = await fetch(APP_CONFIG.apis.articles)
      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)
      await cache.put(APP_CONFIG.apis.articles, response.clone())
      articles = await response.json()
    }

    dispatch(addArticles(articles))
  } catch (error) {
    dispatch(articlesFailed(error.message))
  }
}
