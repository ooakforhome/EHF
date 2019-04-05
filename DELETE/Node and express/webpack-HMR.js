HMR stands for "Hot Module Replacement"

1. webpack-dev-server CLI
Run the webpack-dev-server on the command-line. With this approach you don't need to change your webpack.config.js file, so it's the simplest.

2. webpack-dev-server API
Run WebpackDevServer from a node.js script. Requires some additions to your webpack.config.js.

3. webpack-hot-middleware w/ express
webpack-hot-middleware is used for running a webpack dev server with HMR inside an express server.
