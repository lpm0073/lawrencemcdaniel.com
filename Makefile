# -------------------------------------------------------------------------
# upload to AWS S3
# https://s3.console.aws.amazon.com/s3/buckets/reactjs.lawrencemcdaniel.com
# -------------------------------------------------------------------------
sitemap:
	npm run sitemap

init:
	rm -rf .git/hooks/pre-commit .git/hooks/pre-commit.legacy
	yarn remove pre-commit
	rm -rf node_modules yarn.lock
	yarn cache clean
	yarn install --force
	pre-commit install

update:
	yarn global add npm-check-updates
	ncu --upgrade --packageFile ./package.json
	yarn global upgrade
	yarn install

build:
	yarn build

serve:
	yarn start

release:
	#---------------------------------------------------------
	# usage:      deploy prouduction build of lawrencemcdaniel.com ReactJ
	#             app to AWS S3 bucket.
	#
	#             https://gist.github.com/kellyrmilligan/e242d3dc743105fe91a83cc933ee1314
	#
	#             1. Build the React application
	#             2. Upload to AWS S3
	#             3. Invalidate all items in the AWS Cloudfront CDN.
	#---------------------------------------------------------
	yarn build

	# ------------------------
	# add all built files to the S3 bucket.
	# ------------------------
	aws s3 sync ./build/ s3://reactjs.lawrencemcdaniel.com \
				--acl public-read \
				--delete --cache-control max-age=31536000,public \
				--expires '31 Dec 2050 00:00:01 GMT'

	# ------------------------
	# remove the cache-control header created above with a "no-cache" header so that browsers never cache this page
	# ------------------------
	aws s3 cp s3://reactjs.lawrencemcdaniel.com/service-worker.js s3://reactjs.lawrencemcdaniel.com/service-worker.js --metadata-directive REPLACE --cache-control max-age=0,no-cache,no-store,must-revalidate --content-type application/javascript --acl public-read
	aws s3 cp s3://reactjs.lawrencemcdaniel.com/index.html s3://reactjs.lawrencemcdaniel.com/index.html --metadata-directive REPLACE --cache-control max-age=0,no-cache,no-store,must-revalidate --content-type text/html --acl public-read
	aws s3 cp s3://reactjs.lawrencemcdaniel.com/sitemap.xml s3://reactjs.lawrencemcdaniel.com/sitemap.xml --metadata-directive REPLACE --cache-control max-age=0,no-cache,no-store,must-revalidate --content-type text/xml --acl public-read
	aws s3 cp s3://reactjs.lawrencemcdaniel.com/manifest.json s3://reactjs.lawrencemcdaniel.com/manifest.json --metadata-directive REPLACE --cache-control max-age=0,no-cache,no-store,must-revalidate --content-type text/json --acl public-read

	# invalidate the Cloudfront cache
	aws cloudfront create-invalidation --distribution-id E2364TSMHRWAWL --paths "/*" "/index.html" "/sitemap.xml" "/manifest.json" "/service-worker.js"
