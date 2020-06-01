#!/bin/bash
#---------------------------------------------------------
# written by: Lawrence McDaniel
#             lpm0073@gmail.com
#             lawrencemcdaniel.com
#
# date:       May-2020
#
# usage:      deploy prouduction build of lawrencemcdaniel.com ReactJ
#             app to AWS S3 bucket.
#
#             https://gist.github.com/kellyrmilligan/e242d3dc743105fe91a83cc933ee1314
#---------------------------------------------------------

# ------------------------
# add all built files to the S3 bucket.
# ------------------------
aws s3 sync ./site/build/ s3://reactjs.lawrencemcdaniel.com --acl public-read --delete --cache-control max-age=31536000,public

# ------------------------
# remove the cache-control header created above with a "no-cache" header so that browsers never cache this page
# ------------------------
aws s3 cp s3://reactjs.lawrencemcdaniel.com/service-worker.js s3://reactjs.lawrencemcdaniel.com/service-worker.js --metadata-directive REPLACE --cache-control max-age=0,no-cache,no-store,must-revalidate --content-type application/javascript --acl public-read

aws s3 cp s3://reactjs.lawrencemcdaniel.com/index.html s3://reactjs.lawrencemcdaniel.com/index.html --metadata-directive REPLACE --cache-control max-age=0,no-cache,no-store,must-revalidate --content-type text/html --acl public-read

# invalidate the Cloudfront cache
aws cloudfront create-invalidation \
              --distribution-id E2364TSMHRWAWL \
              --paths "/*" "/index.html"
