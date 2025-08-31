# lawrencemcdaniel.com

My personal web site. Of note:

- React single page web app
- Redux state management
- Progressive web app architecture using workbox
- Static asset precaching using service-worker.js
- Logo cube on home page. see [LogoCube source](https://github.com/lpm0073/lawrencemcdaniel.com/tree/main/src/components/logocube) and my blog post on [Animations in React](https://blog.lawrencemcdaniel.com/animations-in-reactjs/)
- Matrix Digital Rain Effect component. Gives you your favorite Matrix movie screen effect in the form of a React component. Implemented as an [npm package](https://www.npmjs.com/package/react-mdr).
- Content component. An optimized content library sourced by Api's from GitHub, YouTube and Wordpress.

## Installation

```bash
# Setup dev environment
git clone https://github.com/lpm0073/lawrencemcdaniel.com.git
make update

# Develop
make serve

# Build:
make build

# Deploy:
make release
```

## Linting

work in progress: https://dev.to/eclecticcoding/linting-in-react-5c17

## Resources

- API: https://api.lawrencemcdaniel.com/
- CDN: https://cdn.lawrencemcdaniel.com/
- [Create React App](https://github.com/facebook/create-react-app)
- Deploy to AWS S3: https://medium.com/serverlessguru/deploy-reactjs-app-with-s3-static-hosting-f640cb49d7e6
- Configure Cloudfront: https://stackoverflow.com/questions/46497969/cloudfront-returns-403-forbidden-when-refreshing-page

## React Bootstrat

https://react-bootstrap.github.io/components/

## Available Scripts

In the project directory, you can run:

### `ncu --upgrade && yarn install --force`

Check for node package upgrades, updates package-lock.json, updates packages.

### `./deploy.sh`

Executes yarn sitemap + yarn build, pushes to S3 and yarn install-cache headers as necessary for
cache busting purposes.

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

### `yarn sitemap`

Builds sitemap.xml based on configuration in src/components/sitemap/

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
