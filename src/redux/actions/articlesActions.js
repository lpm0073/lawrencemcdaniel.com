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

export const fetchArticles = () => (dispatch) => {
  dispatch(articlesLoading())

  caches.open(APP_CONFIG.caching.names.api).then((cache) => {
    cache.match(APP_CONFIG.apis.articles).then((cachedResponse) => {
      if (cachedResponse) {
        cachedResponse.json().then((articles) => {
          dispatch(addArticles(articles))
        })
      } else {
        fetch(APP_CONFIG.apis.articles)
          .then(
            (response) => {
              if (response.ok) {
                console.debug('fetched wordpress blog posts')
                cache.put(APP_CONFIG.apis.articles, response.clone())
                return response
              } else {
                var error = new Error(
                  'Error ' + response.status + ': ' + response.statusText
                )
                error.response = response
                throw error
              }
            },
            (error) => {
              var errmess = new Error(error.message)
              throw errmess
            }
          )
          .then((response) => response.json())
          .then((articles) => {
            dispatch(addArticles(articles))
          })
          .catch((error) => dispatch(articlesFailed(error.message)))
      }
    })
  })
}
