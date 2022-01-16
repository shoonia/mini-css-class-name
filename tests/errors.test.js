const { test } = require('uvu');
const { throws, type } = require('uvu/assert');

const miniCssClassName = require('..');

const msgPrefixString = 'mini-css-class-name: `prefix` must be a String';
const msgSuffixString = 'mini-css-class-name: `suffix` must be a String';
const msgPrefixStart = 'mini-css-class-name: `prefix` cannot start with a digit or hyphens';
const msgPefSufContain = 'mini-css-class-name: `prefix` and `suffix` can contain only the characters [a-zA-Z0-9], plus the hyphen (-) and the underscore (_)';
const msgRegExp = 'mini-css-class-name: `excludePattern` must be a RegExp';

test('should be invalid options', () => {
  throws(() => miniCssClassName(null), (err) => err instanceof TypeError);
});

test('should be invalid `prefix`', () => {
  throws(() => miniCssClassName({ prefix: null }), msgPrefixString);
  throws(() => miniCssClassName({ prefix: 6 }), msgPrefixString);
  throws(() => miniCssClassName({ prefix: /x/ }), msgPrefixString);
});

test('should be invalid `prefix` char', () => {
  throws(() => miniCssClassName({ prefix: 'x--ß--' }), msgPefSufContain);
});

test('should be invalid first `prefix` char', () => {
  throws(() => miniCssClassName({ prefix: '5' }), msgPrefixStart);
  throws(() => miniCssClassName({ prefix: '-' }), msgPrefixStart);
});

test('should be invalid suffix', () => {
  throws(() => miniCssClassName({ suffix: null }), msgSuffixString);
  throws(() => miniCssClassName({ suffix: 0 }), msgSuffixString);
  throws(() => miniCssClassName({ suffix: /y/ }), msgSuffixString);
});

test('should be invalid `suffix` char', () => {
  throws(() => miniCssClassName({ suffix: '--ß' }), msgPefSufContain);
});

test('should be invalid excludePattern', () => {
  throws(() => miniCssClassName({ excludePattern: '' }), msgRegExp);
  throws(() => miniCssClassName({ excludePattern: 1 }), msgRegExp);
});

// NO ERROR

test('should not be error, excludePattern is null', () => {
  const cb = miniCssClassName({ excludePattern: null });
  type(cb, 'function');
});

test('should not be error, excludePattern is RegExp', () => {
  const cb = miniCssClassName({ excludePattern: /regex/ });
  type(cb, 'function');
});

test.run();
