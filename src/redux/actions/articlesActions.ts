import * as ActionTypes from '../ActionTypes'
import type { AppThunk } from '../configureStore'
import type { Article } from '../../types'
import { getCategories } from '../../shared/categories'
import { APP_CONFIG } from '../../shared/constants'
import { cachedFetchJson, errorMessage } from '../../shared/fetchers/cachedFetch'

/** An article as stored in public/data/, before fetchArticles() adds its skills. */
type RawArticle = Omit<Article, 'skills'>

const articlesLoading = () => ({
  type: ActionTypes.ARTICLES_LOADING,
})

const articlesFailed = (errmess: string) => ({
  type: ActionTypes.ARTICLES_FAILED,
  payload: errmess,
})

const addArticles = (articles: RawArticle[]) => {
  if (!Array.isArray(articles)) {
    throw new Error('Expected articles to be an array')
  }

  return {
    type: ActionTypes.ADD_ARTICLES,
    payload: articles.map(
      (article): Article => ({
        ...article,
        skills: getCategories(article.categories),
      })
    ),
  }
}

export const fetchArticles = (): AppThunk => async (dispatch) => {
  dispatch(articlesLoading())

  try {
    const articles = await cachedFetchJson<RawArticle[]>(
      APP_CONFIG.apis.articles,
      'articles'
    )
    dispatch(addArticles(articles))
  } catch (error) {
    dispatch(articlesFailed(errorMessage(error)))
  }
}
