/*
 WordPress Api blog post downloader utility. Creates a list of json objects of blog post metadata by category.

 example output:
   {
    "id": 5909,
    "modified_gmt": "2023-10-24T15:52:53",
    "slug": "chatgpt-full-stack-using-react-aws-serverless",
    "status": "publish",
    "type": "post",
    "link": "https://blog.lawrencemcdaniel.com/chatgpt-full-stack-using-react-aws-serverless/",
    "excerpt": {
      "rendered": "<p>Build a custom ChatGPT web app in no time with this open source ready-for-production React + AWS Serverless scaffolding. This completely free, public GitHub repository includes Vite, Terraform, AWS API Gateway and AWS Lambda.</p>\n",
      "protected": false
    },
    "author": 3,
    "featured_media": 5981,
    "categories": [
      "aws",
      "reactjs"
    ],
    "tags": [],
    "yoast_head_json": {
      "title": "ChatGPT Full Stack Using React + AWS Serverless - Blog",
      "description": "Build a custom ChatGPT web app in no time with this open source ready-for-production React + AWS Serverless scaffolding.",
      "canonical": "https://blog.lawrencemcdaniel.com/chatgpt-full-stack-using-react-aws-serverless/",
      "og_locale": "en_US",
      "og_type": "article",
      "og_title": "OpenAI API With AWS Lambda",
      "og_description": "A production-ready codebase implementing a REST API backed by OpenAI using AWS API Gateway, Lambda, and the OpenAI Python library.",
      "og_url": "https://blog.lawrencemcdaniel.com/chatgpt-full-stack-using-react-aws-serverless/",
      "article_modified_time": "2023-10-24T15:52:53+00:00",
      "og_image": [
        {
          "width": 1508,
          "height": 820,
          "url": "https://blog.lawrencemcdaniel.com/wp-content/uploads/2023/09/openai-aws.png",
          "type": "image/png"
        }
      ]
    },
    "_links": [
      {
        "embeddable": true,
        "href": "https://blog.lawrencemcdaniel.com/wp-json/wp/v2/media/5981"
      }
    ]
  }
*/

import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

import { URL_API_BLOG_POSTS, URL_API_BLOG_CATEGORIES } from '../constants.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const outputPath = join(__dirname, '../../../public/data/blog.lawrencemcdaniel.com.json')

function blogApiHeaders() {
  const headers = {
    Accept: 'application/json',
  }

  return headers
}

async function fetchBlogCategories() {
  const concept = 'Wordpress blog categories'
  try {
    const response = await fetch(URL_API_BLOG_CATEGORIES, {
      method: 'GET',
      headers: blogApiHeaders(),
    })
    if (response.ok) {
      const repos = await response.json()
      console.log(`Fetched ${repos.length} blog categories`)
      return repos.map((category) => {
        return {
          id: category.id,
          name: category.name,
          slug: category.slug,
        }
      })
    } else {
      console.error(`Error fetching ${concept}: ${response.statusText}`)
    }
  } catch (error) {
    console.error(`Error fetching ${concept}:`, error)
  }
  console.error(`Error fetching ${concept}: Not Found`)
  return []
}

async function fetchBlogPosts(categories) {
  const concept = 'Wordpress blog posts'

  try {
    const response = await fetch(URL_API_BLOG_POSTS, {
      method: 'GET',
      headers: blogApiHeaders(),
    })
    if (response.ok) {
      const repos = await response.json()
      return repos.map((post) => {
        return {
          id: post.id,
          modified_gmt: post.modified_gmt,
          slug: post.slug,
          status: post.status,
          type: post.type,
          link: post.link,
          excerpt: post.excerpt,
          author: post.author,
          featured_media: post.featured_media,
          categories: post.categories
            .map((categoryId) => {
              const category = categories.find((cat) => cat.id === categoryId)
              return category ? category.slug : null
            })
            .filter(Boolean),
          tags: post.tags,
          yoast_head_json: {
            title: post.yoast_head_json?.title,
            description: post.yoast_head_json?.description,
            canonical: post.yoast_head_json?.canonical,
            og_locale: post.yoast_head_json?.og_locale,
            og_type: post.yoast_head_json?.og_type,
            og_title: post.yoast_head_json?.og_title,
            og_description: post.yoast_head_json?.og_description,
            og_url: post.yoast_head_json?.og_url,
            article_modified_time: post.yoast_head_json?.article_modified_time,
            og_image: post.yoast_head_json?.og_image,
          },
          _links: post._links?.['wp:featuredmedia'],
        }
      })
    } else {
      console.error(`Error fetching ${concept}: ${response.statusText}`)
    }
  } catch (error) {
    console.error(`Error fetching ${concept}:`, error)
  }
  console.error(`Error fetching ${concept}: Not Found`)
  return []
}

const categories = [...(await fetchBlogCategories())] || []
const articles = [...(await fetchBlogPosts(categories))]

if (articles.length === 0) {
  console.error('No articles found.')
  process.exit(1)
}
console.log(`Found ${articles.length} articles.`)
writeFileSync(outputPath, JSON.stringify(articles), 'utf8')
console.log(`Repositories written to ${outputPath}`)
