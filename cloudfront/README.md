# CloudFront

The site is served from S3 by the CloudFront distribution `E2364TSMHRWAWL`.
The deploy workflow uploads it (`.github/workflows/deploy.yml`). Two settings of
the distribution itself are set by hand, once, with the commands below. No
workflow changes them.

## What the distribution does

| Request                                         | Response                                                        |
| ----------------------------------------------- | --------------------------------------------------------------- |
| `/smarter`, `/portfolio/<slug>`, any other page | the page's prerendered html, from its S3 key (`smarter`, ...)   |
| `/`                                             | `index.html`, the home page                                     |
| `www.lawrencemcdaniel.com/...`                  | 301 to `https://lawrencemcdaniel.com/...` (`viewer-request.js`) |
| `/smarter/` (a trailing slash)                  | 301 to `/smarter` (`viewer-request.js`)                         |
| `/full-bio`                                     | 301 to `/bio` (`viewer-request.js`)                             |
| a path that matches no file                     | `404.html` with status 404 (the distribution's error responses) |

The build prerenders every page (`src/prerender/`), and the deploy uploads each
one twice: as `<path>/index.html` and as `<path>`, so that S3 has a key for the
path that CloudFront requests.

A portfolio project added in WordPress gets its page with the next deploy.
Until then its url returns the 404 page, which the app turns into the project's
page in the browser, so visitors see it but search engines don't.

## Setting it up

Run these once, in this order, after a deploy has uploaded the prerendered
pages and `404.html` (check that `curl -sI https://lawrencemcdaniel.com/404.html`
returns 200). Changing the error responses before then would turn every page
except the home page into the 404 page.

1. Look at what the distribution has now. Its default cache behavior must not
   already have a viewer request function or Lambda@Edge function, and its error
   responses today send `index.html` with a 200 for 403 and 404 errors:

   ```console
   aws cloudfront get-distribution-config --id E2364TSMHRWAWL > distribution.json
   jq '.DistributionConfig | {functions: .DefaultCacheBehavior.FunctionAssociations,
       lambdas: .DefaultCacheBehavior.LambdaFunctionAssociations,
       errors: .CustomErrorResponses}' distribution.json
   ```

2. Create and publish the function:

   ```console
   aws cloudfront create-function --name lawrencemcdaniel-viewer-request \
     --function-config '{"Comment":"lawrencemcdaniel.com redirects","Runtime":"cloudfront-js-2.0"}' \
     --function-code fileb://cloudfront/viewer-request.js
   ETAG=$(aws cloudfront describe-function --name lawrencemcdaniel-viewer-request \
     --query ETag --output text)
   aws cloudfront publish-function --name lawrencemcdaniel-viewer-request --if-match "$ETAG"
   ```

3. Associate it with the default cache behavior, and serve `404.html` with a 404
   status for missing files. S3 answers 403, not 404, for a key that doesn't
   exist when the bucket can't be listed, so both are mapped:

   ```console
   ARN=$(aws cloudfront describe-function --name lawrencemcdaniel-viewer-request \
     --stage LIVE --query FunctionSummary.FunctionMetadata.FunctionARN --output text)
   jq --arg arn "$ARN" '.DistributionConfig
     | .DefaultCacheBehavior.FunctionAssociations =
         {Quantity: 1, Items: [{EventType: "viewer-request", FunctionARN: $arn}]}
     | .CustomErrorResponses = {Quantity: 2, Items: [
         {ErrorCode: 403, ResponsePagePath: "/404.html", ResponseCode: "404", ErrorCachingMinTTL: 60},
         {ErrorCode: 404, ResponsePagePath: "/404.html", ResponseCode: "404", ErrorCachingMinTTL: 60}]}' \
     distribution.json > distribution-new.json
   aws cloudfront update-distribution --id E2364TSMHRWAWL \
     --if-match "$(jq -r .ETag distribution.json)" \
     --distribution-config file://distribution-new.json
   ```

4. When the distribution has deployed (a few minutes), check:

   ```console
   curl -sI https://www.lawrencemcdaniel.com/smarter | grep -i -E '^(HTTP|location)'   # 301 to https://lawrencemcdaniel.com/smarter
   curl -sI https://lawrencemcdaniel.com/smarter/ | grep -i -E '^(HTTP|location)'      # 301 to /smarter
   curl -sI https://lawrencemcdaniel.com/does-not-exist | head -1                         # 404
   curl -s https://lawrencemcdaniel.com/smarter | grep -o '<title[^<]*'                   # The Smarter Project
   ```

## Changing the function

Edit `viewer-request.js`, run its tests (`yarn test cloudfront`), then:

```console
ETAG=$(aws cloudfront describe-function --name lawrencemcdaniel-viewer-request --query ETag --output text)
aws cloudfront update-function --name lawrencemcdaniel-viewer-request --if-match "$ETAG" \
  --function-config '{"Comment":"lawrencemcdaniel.com redirects","Runtime":"cloudfront-js-2.0"}' \
  --function-code fileb://cloudfront/viewer-request.js
ETAG=$(aws cloudfront describe-function --name lawrencemcdaniel-viewer-request --query ETag --output text)
aws cloudfront publish-function --name lawrencemcdaniel-viewer-request --if-match "$ETAG"
```

The distribution uses the published (LIVE) version, so it needs no update.
