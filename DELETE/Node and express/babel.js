1, babel preset env for compiling Javascript ES6 code down to ES5 (please note that babel-preset-es2015 is now deprecated)
2, babel preset react for compiling JSX and other stuff down to Javascript
3, babel-loader is a webpack loader that hooks Babel into webpack. We will run Babel from webpack with this package.
4, @babel/core is the main dependency that includes babel transform script.
5, @babel/preset-env is the default Babel preset used to transform ES6+ into valid ES5 code. Optionally configures browser polyfills automatically.
6, @babel/preset-react is used for transforming JSX and React class syntax into valid JavaScript code.
