# mini-css-class-name

[![test status](https://github.com/shoonia/mini-css-class-name/workflows/test/badge.svg)](https://github.com/shoonia/mini-css-class-name/actions)
[![npm version](https://img.shields.io/npm/v/mini-css-class-name.svg)](https://www.npmjs.com/package/mini-css-class-name)

Minimum size unique CSS class names generator.
It can be used with [Webpack](#css-modules), [Gatsby](https://github.com/shoonia/gatsby-plugin-mini-css-class-name#readme) and [PostCSS](#postcss-modules) ecosystems.

## Install

```bash
npm i mini-css-class-name --save-dev
# or
yarn add mini-css-class-name -D
```

## How to use

```js
const miniCssClassName = require('mini-css-class-name');

const generate = miniCssClassName({
  prefix: 'x__',
  suffix: '--y',
});

generate(); // x__a--y
generate(); // x__b--y
generate(); // x__c--y
```

## Reset method

```js
const miniCssClassName = require('mini-css-class-name');

const generate = miniCssClassName();

generate(); // a
generate(); // b
generate(); // c

generate.reset();

generate(); // a
```

## Exclude Pattern

You can use a regular expression to exclude any characters from the template string.

```js
// remove underscore and dash
const generate = miniCssClassName({ excludePattern: /[_-]/g });

// keep only alphabet characters
const generateABC = miniCssClassName({ excludePattern: /[^a-z]/gi });
```

Default template string

```js
'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-0123456789';
```

## CSS Modules

### css-loader

```js
const createLocalIdent = require('mini-css-class-name/css-loader');
```

There are two ways to plugin it's depending on css-loader version.

**css-loader <= 1.x || ~2.x**

```js
const createLocalIdent = require('mini-css-class-name/css-loader');

const localIndent = createLocalIdent(/* options */);

module.exports = {

  // webpack config ...

  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'css-loader',
        options: {
          modules: true,
          getLocalIdent: localIndent,
        },
      },
    ],
  },
};
```

**css-loader >= 3.0.0**

```js
const createLocalIdent = require('mini-css-class-name/css-loader');

const localIndent = createLocalIdent(/* options */);

module.exports = {

  // webpack config ...

  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'css-loader',
        options: {
          modules: {
            getLocalIdent: localIndent,
          },
        },
      },
    ],
  },
};
```

### postcss-modules

```js
const generateScopedName = require('mini-css-class-name/postcss-modules');
```

**Example**

```js
const { readFile } = require('fs/promises');
const postcss = require('postcss');
const postcssModules = require('postcss-modules');
const generateScopedName = require('mini-css-class-name/postcss-modules');

const getStyles = async () => {
  let json;

  const source = await readFile('./styles.css', 'utf8');

  const { css } = await postcss([
    postcssModules({
      generateScopedName: generateScopedName(/* options */),
      getJSON(_, jsonData) {
        json = jsonData;
      },
    }),
  ]).process(source);

  return { json, css };
};
```

## Gatsby

You also can use it with [Gatsby](https://www.gatsbyjs.org/docs/add-custom-webpack-config/) v2, v3 or v4

> [gatsby-plugin-mini-css-class-name](https://github.com/shoonia/gatsby-plugin-mini-css-class-name#readme)

## Options

|    Name          |   Type     | Default | Description |
|:----------------:|:----------:|:-------:|:-----------:|
| **prefix**       | `{String}` |  `''`   | A custom prefix will be added to each class name
| **suffix**       | `{String}` |  `''`   | A custom suffix will be added to each class name
|**excludePattern**| `{RegExp}` | `null`  | A regular expression for removing characters

## License

[MIT](./LICENSE)
