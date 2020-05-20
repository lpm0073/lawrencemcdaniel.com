# lawrencemcdaniel.com

ReactJS front end for my personal web site.

- Develop: ./site/yarn start
- Build: ./site/yarn build
- Deploy: ./deploy.sh

## Wordpress Integration

https://developer.wordpress.org/rest-api/using-the-rest-api/client-libraries/
https://gist.github.com/verticalgrain/eb694cfbc8ac7da7ae8d876858019921
https://lawrencemcdaniel.com/wp-json/wp/v2


## Specialties images
- portfolio: https://lawrencemcdaniel.com/wp-json/wp/v2/posts?categories=47&_embed&_fields=id,content,title,featured_media
- clients: https://lawrencemcdaniel.com/wp-json/wp/v2/posts?categories=46&_embed
- ???????: https://lawrencemcdaniel.com/wp-json/wp/v2/posts?categories=45&_embed
- ???????: https://lawrencemcdaniel.com/wp-json/wp/v2/posts?categories=45&_embed
- Specialties: https://lawrencemcdaniel.com/wp-json/wp/v2/posts?categories=43&_embed
- https://lawrencemcdaniel.com/wp-json/wp/v2/posts?categories=43&_embed&id=2664
- https://lawrencemcdaniel.com/wp-json/wp/v2/portfolio
- https://lawrencemcdaniel.com/wp-json/wp/v2/media
- https://lawrencemcdaniel.com/wp-json/wp/v2/categories

## Media URL by Media ID
- https://lawrencemcdaniel.com/wp-json/wp/v2/media?_fields=id,source_url&include[]=2324


## Deploy to AWS S3
- https://medium.com/serverlessguru/deploy-reactjs-app-with-s3-static-hosting-f640cb49d7e6

## Configure Cloudfront
- https://stackoverflow.com/questions/46497969/cloudfront-returns-403-forbidden-when-refreshing-page


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Node dev server:
cd /Users/mcdaniel/github/lpm0073/lawrencemcdaniel.com/json-server/
json-server --watch db.json -p 3001 -d 2000

https://www.coursera.org/learn/front-end-react/peer/ptyN7/react-router-and-single-page-applications

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
