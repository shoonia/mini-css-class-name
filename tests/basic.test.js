const { test } = require('node:test');
const { strictEqual, deepStrictEqual } = require('node:assert/strict');

const { unique, array1e5, LENGTH } = require('./util');
const miniCssClassName = require('..');

test('should be alphabet a queue', () => {
  const generate = miniCssClassName();

  strictEqual(generate(), 'a');
  strictEqual(generate(), 'b');
  strictEqual(generate(), 'c');
});

test('should be 200 000 unique className', () => {
  const generate = miniCssClassName();
  const classList = array1e5().map(() => generate());
  const uniqueList = unique(classList);

  generate.reset();

  strictEqual(uniqueList.length, LENGTH);
});

test('should be 200 000 unique className with prefix', () => {
  const generate = miniCssClassName({
    prefix: 'prefix--',
  });

  const classList = array1e5().map(() => generate());
  const uniqueList = unique(classList);

  generate.reset();

  strictEqual(uniqueList.length, LENGTH);
});

test('should be 200 000 unique className with suffix', () => {
  const generate = miniCssClassName({
    suffix: '--suffix',
  });

  const classList = array1e5().map(() => generate());
  const uniqueList = unique(classList);

  generate.reset();

  strictEqual(uniqueList.length, LENGTH);
});

test('should be 200 000 unique className with suffix and prefix', () => {
  const generate = miniCssClassName({
    prefix: 'prefix--',
    suffix: '--suffix',
  });

  const classList = array1e5().map(() => generate());
  const uniqueList = unique(classList);

  generate.reset();

  strictEqual(uniqueList.length, LENGTH);
});

test('should be valid first character class name', () => {
  const generate = miniCssClassName();

  array1e5().forEach(() => {
    const className = generate();
    strictEqual(/[^a-z_]/i.test(className[0]), false);
  });

  generate.reset();
});

test('should reset', () => {
  const generate = miniCssClassName();

  const list1 = array1e5().map(() => generate());

  generate.reset();

  const list2 = array1e5().map(() => generate());

  generate.reset();

  deepStrictEqual(list1, list2);
});
