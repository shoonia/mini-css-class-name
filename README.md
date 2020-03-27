# mini-css-class-name

[![test status](https://github.com/shoonia/mini-css-class-name/workflows/test/badge.svg)](https://github.com/shoonia/mini-css-class-name/actions)
[![npm version](https://img.shields.io/npm/v/mini-css-class-name.svg)](https://www.npmjs.com/package/mini-css-class-name)

Minimum size unique CSS class names generator.
It can be used with [Webpack](#css-modules) and [Gatsby](https://github.com/shoonia/gatsby-plugin-mini-css-class-name#readme) ecosystems.

## Install
```bash
npm i mini-css-class-name --save-dev
# or
yarn add mini-css-class-name -D
```

## How to use
```js
const miniClassName = require("mini-css-class-name");

const generate = miniClassName({
  prefix: "x__",
  suffix: "--",
  hash: 4,
});

generate(); // x__a--ZwkO
generate(); // x__b--9dO4
generate(); // x__c--rRI0
```

## Reset method
```js
const miniClassName = require("mini-css-class-name");

const generate = miniClassName();

generate(); // a
generate(); // b
generate(); // c

generate.reset();

generate(); // a
```

## Exclude Pattern
You can use a regular expression to exclude any characters.
```js
// remove underscore and dash
const generate = miniClassName({ excludePattern: /[_-]/g });

// keep only alphabet characters
const generateABC = miniClassName({ excludePattern: /[^a-z]/gi });
```

## CSS Modules

**webpack.config.js**
```js
const createLocalIdent = require("mini-css-class-name/css-loader");
```
There are two ways to plug it's depending on css-loader version.

**css-loader <= 1.x || ~2.x**
```js
module.exports = {

  // webpack config ...

  module: {
    rules: [
      {
        test: /\.css$/,
        loader: "css-loader",
        options: {
          modules: true,
          getLocalIdent: createLocalIdent(/* options */),
        },
      },
    ],
  },
};
```
**css-loader >= 3.0.0**
```js
module.exports = {

  // webpack config ...

  module: {
    rules: [
      {
        test: /\.css$/,
        loader: "css-loader",
        options: {
          modules: {
            getLocalIdent: createLocalIdent(/* options */),
          },
        },
      },
    ],
  },
};
```
[Documentation about css-modules](https://github.com/webpack-contrib/css-loader#modules)

## Gatsby
You also can use it with [Gatsby](https://www.gatsbyjs.org/docs/add-custom-webpack-config/) v2

> [gatsby-plugin-mini-css-class-name](https://github.com/shoonia/gatsby-plugin-mini-css-class-name#readme)

## Options
|    Name          |   Type     | Default | Description |
|:----------------:|:----------:|:-------:|:-----------:|
| **prefix**       | `{String}` |  `""`   | A custom prefix will be added to each class name
| **suffix**       | `{String}` |  `""`   | A custom suffix will be added to each class name
|  **hash**        | `{Number}` |   `0`   | A length of generating a random hash tail for each class name
|**excludePattern**| `{RegExp}` | `null`  | A regular expression for removing characters

## License
[MIT](./LICENSE)
