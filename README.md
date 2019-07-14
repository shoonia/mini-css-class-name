# mini-css-class-name
Minimum size unique CSS class names generator.
It can be used with Webpack ecosystem. [more](#css-modules)

## Install

```bash
npm i mini-css-class-name
# or
yarn add mini-css-class-name
```

## Start

```js
// CommonJS
const miniClassNames = require('mini-css-class-name');
// ES6
import miniClassName from 'mini-css-class-name';
```

## Basic

```js
import miniClassNames from 'mini-css-class-name';

const generate = miniClassNames({
  prefix: 'x__',
  suffix: '--',
  hash: 4,
});

generate(); // x__a--e9di
generate(); // x__b--ei27
generate(); // x__c--e80f
```

## Reset method

```js
import miniClassNames from 'mini-css-class-name';

const generate = miniClassNames();

generate(); // a
generate(); // b
generate(); // c

generate.reset();

generate(); // a
```

## CSS Modules

**webpack.config.js**
```js
// CommonJS
const getLocalIdent = require('mini-css-class-name/css-loader');
// ES6
import { getLocalIdent } from 'mini-css-class-name';
```
There are two ways to plug it's depending on css-loader version.
```js
// css-loader < v3.0.0
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'css-loader',
        options: {
          modules: true,
          getLocalIdent: getLocalIdent(/* options */),
        },
      },
    ],
  },
}

// css-loader >= v3.0.0
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'css-loader',
        options: {
          modules: {
            getLocalIdent: getLocalIdent(/* options */),
          },
        },
      },
    ],
  },
}
```
[Documentation about css-modules](https://github.com/webpack-contrib/css-loader#modules)

## Options

|    Name    |   Type     | Default | Description |
|:----------:|:----------:|:-------:|:-----------:|
| **prefix** | `{String}` |  `""`   |  a custom prefix will be added to each class name
| **suffix** | `{String}` |  `""`   |  a custom suffix will be added to each class name
|  **hash**  | `{Number}` |   `0`   |  a length of generating a random hash tail for each class name.

## License

[MIT](./LICENSE)
