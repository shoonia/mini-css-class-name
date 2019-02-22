# mini-css-class-name
Minimum size unique CSS class names generator

## Basic

```js
const minClassNames = require('mini-css-class-name');

const generate = minClassNames({
  prefix: 'x__',
  suffix: '--',
  hash: 4,
});

generate(); // x__a--e9di
generate(); // x__b--ei27
generate(); // x__c--e80f
```

## Reset

```js
const minClassNames = require('mini-css-class-name');

const generate = minClassNames();

generate(); // a
generate(); // b
generate(); // c

generate.reset();

generate(); // a
```

## CSS Modules

### webpack.config.js
```js
const minClassNames = require('mini-css-class-name/css-loader');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'css-loader',
        options: {
          modules: true,
          getLocalIdent: minClassNames({ hash: 4 }),
        },
      },
    ],
  },
};
```
