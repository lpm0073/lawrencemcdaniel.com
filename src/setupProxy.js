const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  console.log('creating proxy for linkedin.')
  app.use(
    '/linkedin_api_proxy/v2/me',
    createProxyMiddleware({
      target: 'https://api.linkedin.com/v2/me',
      changeOrigin: true,
    })
  )
}
