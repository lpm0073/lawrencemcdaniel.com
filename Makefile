# -------------------------------------------------------------------------
# lawrencemcdaniel.com
#
# Deploys are done by GitHub Actions, on every merge to main:
# .github/workflows/deploy.yml (to redeploy by hand: gh workflow run deploy.yml)
# -------------------------------------------------------------------------
.PHONY: analyze sitemap init lint test update site build serve

sitemap:
	yarn run sitemap

analyze:
	cloc . --exclude-ext=svg,zip --fullpath --not-match-d=smarter/smarter/static/assets/ --vcs=git

init:
	rm -rf node_modules yarn.lock
	yarn cache clean
	yarn install --force

lint:
	yarn format
	yarn lint:fix

test:
	yarn format:check
	yarn lint
	yarn typecheck
	yarn coverage

upgrade:
	yarn global add npm-check-updates
	ncu --upgrade --packageFile ./package.json
	yarn global upgrade
	yarn install --force

github:
	node src/shared/fetchers/githubRepoFetcher.ts

blog:
	node src/shared/fetchers/blogPostFetcher.ts

yt:
	node src/shared/fetchers/youtubeFetcher.ts

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

site:
	#---------------------------------------------------------
	# usage:      production build into ./build, from the data
	#             already in public/data. Uploads nothing.
	#---------------------------------------------------------
	yarn sitemap
	cp package.json public/package.json
	yarn build

build:
	#---------------------------------------------------------
	# usage:      refresh public/data (which also uploads it to
	#             S3, see update), then build the site.
	#---------------------------------------------------------
	make update
	make site

serve:
	yarn start

