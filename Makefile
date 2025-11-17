# -------------------------------------------------------------------------
# upload to AWS S3
# https://s3.console.aws.amazon.com/s3/buckets/reactjs.lawrencemcdaniel.com
# -------------------------------------------------------------------------
.PHONY: analyze sitemap init update build serve release

sitemap:
	yarn run sitemap

analyze:
	cloc . --exclude-ext=svg,zip --fullpath --not-match-d=smarter/smarter/static/assets/ --vcs=git

init:
	rm -rf node_modules yarn.lock
	yarn cache clean
	yarn install --force

lint:
	npx prettier --write "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}"

upgrade:
	yarn global add npm-check-updates
	ncu --upgrade --packageFile ./package.json
	yarn global upgrade
	yarn install --force

github:
	node src/shared/fetchers/githubRepoFetcher.js

blog:
	node src/shared/fetchers/blogPostFetcher.js

yt:
	node src/shared/fetchers/youtubeFetcher.js

update:
	#---------------------------------------------------------
	# usage:      update the github.json file with the latest
	#             data from the GitHub API.
	#
	#             This is used to display the latest GitHub
	#             activity on the home page.
	#
	# Note: requires node v24 or later.
	#---------------------------------------------------------
	make github
	make blog
	make yt
	aws s3 sync public/data/ s3://reactjs.lawrencemcdaniel.com/data/ --cache-control max-age=0,no-cache,no-store,must-revalidate --content-type text/json --acl public-read
	aws cloudfront create-invalidation --distribution-id E2364TSMHRWAWL --paths "/data/"

build: sitemap
	make update
	cp package.json public/package.json
	yarn build

serve:
	yarn start

release:
	#---------------------------------------------------------
	# usage:      deploy production build of lawrencemcdaniel.com ReactJ
	#             app to AWS S3 bucket.
	#
	#             https://gist.github.com/kellyrmilligan/e242d3dc743105fe91a83cc933ee1314
	#
	#             1. Build the React application
	#             2. Upload to AWS S3
	#             3. Invalidate all items in the AWS Cloudfront CDN.
	#
	# Note: requires node v24 or later.
	#---------------------------------------------------------
	export AWS_PROFILE=lawrence
	make build

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
	aws s3 cp s3://reactjs.lawrencemcdaniel.com/data/github.json s3://reactjs.lawrencemcdaniel.com/data/github.json --metadata-directive REPLACE --cache-control max-age=0,no-cache,no-store,must-revalidate --content-type text/json --acl public-read

	# invalidate the Cloudfront cache
	aws cloudfront create-invalidation --distribution-id E2364TSMHRWAWL --paths "/*" "/index.html" "/sitemap.xml" "/manifest.json" "/service-worker.js"
