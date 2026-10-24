/*
 * CloudFront Function for lawrencemcdaniel.com: the viewer request handler of
 * the site's distribution (runtime cloudfront-js-2.0). See README.md here for
 * how it is published and associated.
 *
 * Permanent (301) redirects, so that every page has exactly one url, the one
 * its canonical link names:
 *
 * - any other host, e.g. www.lawrencemcdaniel.com, to lawrencemcdaniel.com
 * - a path with a trailing slash to the path without it, e.g. /smarter/ to /smarter
 * - pages that moved, e.g. /full-bio to /bio
 *
 * Every other request goes on to S3 unchanged. The query string is kept.
 *
 * CloudFront Functions are not modules: the runtime calls handler(), and the
 * file has no exports. cloudfront/viewer-request.test.ts loads it the same way.
 */
var CANONICAL_HOST = 'lawrencemcdaniel.com'

/** Pages that moved: old path to new path. */
var MOVED = {
  '/full-bio': '/bio',
}

function queryString(querystring) {
  var parts = []
  Object.keys(querystring || {}).forEach(function (name) {
    var parameter = querystring[name]
    var values = parameter.multiValue
      ? parameter.multiValue.map(function (item) {
          return item.value
        })
      : [parameter.value]
    values.forEach(function (value) {
      parts.push(value === '' ? name : name + '=' + value)
    })
  })
  return parts.length > 0 ? '?' + parts.join('&') : ''
}

// called by CloudFront
function handler(event) {
  var request = event.request
  var host = request.headers.host ? request.headers.host.value : CANONICAL_HOST
  var uri = request.uri

  var path = uri.length > 1 ? uri.replace(/\/+$/, '') || '/' : uri
  if (MOVED[path]) path = MOVED[path]

  if (host === CANONICAL_HOST && path === uri) return request

  return {
    statusCode: 301,
    statusDescription: 'Moved Permanently',
    headers: {
      location: {
        value: 'https://' + CANONICAL_HOST + path + queryString(request.querystring),
      },
      'cache-control': { value: 'max-age=86400' },
    },
  }
}
