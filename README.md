# mini-css-class-name
Minimum size unique CSS class names generator.
It can be used with Webpack and Gatsby ecosystems. [more](#css-modules)

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
```js
// css-loader < v3.0.0
module.exports = {
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

// css-loader >= v3.0.0
module.exports = {
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

**gatsby-node.js**
```js
const { cloneDeepWith } = require("lodash");
const miniClassNames = require("mini-css-class-name/css-loader");

const generate = miniClassNames(/* options */);

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const config = getConfig();

  config.module.rules = cloneDeepWith(config.module.rules, (value, key) => {
    if (key === "options" && value.modules) {
      return {
        ...value,
        localIdentName: undefined,
        getLocalIdent: generate,
      };
    }
  });

  actions.replaceWebpackConfig(config);
};
```

## Options
|    Name          |   Type     | Default | Description |
|:----------------:|:----------:|:-------:|:-----------:|
| **prefix**       | `{String}` |  `""`   | a custom prefix will be added to each class name
| **suffix**       | `{String}` |  `""`   | a custom suffix will be added to each class name
|  **hash**        | `{Number}` |   `0`   | a length of generating a random hash tail for each class name.
|**excludePattern**| `{RegExp}` | `null`  | a regular expression for removing characters

## License
[MIT](./LICENSE)
