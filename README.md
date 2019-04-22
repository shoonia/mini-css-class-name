# mini-css-class-name
Minimum size unique CSS class names generator

# Install

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

## Reset

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
const getLocalIdent = require('mini-css-class-name/css-loader');

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
};
```

### ES6

```js
import { getLocalIdent } from 'mini-css-class-name';
```
## Options

|    Name    |   Type     | Default | Description                      |
|:----------:|:----------:|:-------:|:--------------------------------:|
| **prefix** | `{String}` |  `""`   |  prefix added to each class name
| **suffix** | `{String}` |  `""`   |  suffix added to each class name
|  **hash**  | `{Number}` |   `0`   |  length of generating a hash key

## License

[MIT](./LICENSE)
