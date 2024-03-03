const { test } = require('node:test');
const { throws, ok } = require('node:assert/strict');

const miniCssClassName = require('..');

const prefixString = new TypeError('mini-css-class-name: `prefix` must be a String');
const suffixString = new TypeError('mini-css-class-name: `suffix` must be a String');
const prefixStart = new TypeError('mini-css-class-name: `prefix` cannot start with a digit or hyphens');
const pefSufContain = new TypeError('mini-css-class-name: `prefix` and `suffix` can contain only the characters [a-zA-Z0-9], plus the hyphen (-) and the underscore (_)');
const msgRegExp = new TypeError('mini-css-class-name: `excludePattern` must be a RegExp');

test('should be invalid options', () => {
  throws(() => miniCssClassName(null), TypeError);
});

test('should be invalid `prefix`', () => {
  throws(() => miniCssClassName({ prefix: null }), prefixString);
  throws(() => miniCssClassName({ prefix: 6 }), prefixString);
  throws(() => miniCssClassName({ prefix: /x/ }), prefixString);
});

test('should be invalid `prefix` char', () => {
  throws(() => miniCssClassName({ prefix: 'x--ß--' }), pefSufContain);
});

test('should be invalid first `prefix` char', () => {
  throws(() => miniCssClassName({ prefix: '5' }), prefixStart);
  throws(() => miniCssClassName({ prefix: '-' }), prefixStart);
});

test('should be invalid suffix', () => {
  throws(() => miniCssClassName({ suffix: null }), suffixString);
  throws(() => miniCssClassName({ suffix: 0 }), suffixString);
  throws(() => miniCssClassName({ suffix: /y/ }), suffixString);
});

test('should be invalid `suffix` char', () => {
  throws(() => miniCssClassName({ suffix: '--ß' }), pefSufContain);
});

test('should be invalid excludePattern', () => {
  throws(() => miniCssClassName({ excludePattern: '' }), msgRegExp);
  throws(() => miniCssClassName({ excludePattern: 1 }), msgRegExp);
});

// NO ERROR

test('should not be error, excludePattern is null', () => {
  const cb = miniCssClassName({ excludePattern: null });

  ok(cb instanceof Function);
});

test('should not be error, excludePattern is RegExp', () => {
  const cb = miniCssClassName({ excludePattern: /regex/ });

  ok(cb instanceof Function);
});
