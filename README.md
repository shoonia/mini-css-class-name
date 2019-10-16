# mini-css-class-name
Minimum size unique CSS class names generator.
It can be used with [Webpack](#css-modules) and [Gatsby](https://github.com/shoonia/gatsby-plugin-mini-css-class-name#readme) ecosystems.

## Install
```bash
npm i mini-css-class-name
# or
yarn add mini-css-class-name
```

## Start
```js
// CommonJS
const miniClassNames = require("mini-css-class-name");
// ES6
import miniClassName from "mini-css-class-name";
```

## Basic
```js
import miniClassNames from "mini-css-class-name";

const generate = miniClassNames({
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
import miniClassNames from "mini-css-class-name";

const generate = miniClassNames();

generate(); // a
generate(); // b
generate(); // c

generate.reset();

generate(); // a
```

## Exclude Pattern
You can use a regular expression to exclude any characters.
```js
const generate = miniClassName({ excludePattern: /[_-]/g }); // remove underscore and dash
const generateABC = miniClassName({ excludePattern: /[^a-z]/gi }); // keep only alphabet characters
```

## CSS Modules

**webpack.config.js**
```js
// CommonJS
const getLocalIdent = require("mini-css-class-name/css-loader");
// ES6
import { getLocalIdent } from "mini-css-class-name";
```
There are two ways to plug it's depending on css-loader version.

**css-loader >= 1.0.0 || >= 2.0.0**
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
          getLocalIdent: getLocalIdent(/* options */),
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
            getLocalIdent: getLocalIdent(/* options */),
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
