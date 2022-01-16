const { test } = require('uvu');
const { is, equal } = require('uvu/assert');

const { unique, array1e5, LENGTH } = require('./util');
const miniCssClassName = require('..');

test('should be alphabet a queue', () => {
  const generate = miniCssClassName();

  is(generate(), 'a');
  is(generate(), 'b');
  is(generate(), 'c');
});

test('should be 100 000 unique className', () => {
  const generate = miniCssClassName();
  const classList = array1e5().map(() => generate());
  const uniqueList = unique(classList);

  generate.reset();

  is(uniqueList.length, LENGTH);
});

test('should be 100 000 unique className with prefix', () => {
  const generate = miniCssClassName({
    prefix: 'prefix--',
  });

  const classList = array1e5().map(() => generate());
  const uniqueList = unique(classList);

  generate.reset();

  is(uniqueList.length, LENGTH);
});

test('should be 100 000 unique className with suffix', () => {
  const generate = miniCssClassName({
    suffix: '--suffix',
  });

  const classList = array1e5().map(() => generate());
  const uniqueList = unique(classList);

  generate.reset();

  is(uniqueList.length, LENGTH);
});

test('should be 100 000 unique className with suffix and prefix', () => {
  const generate = miniCssClassName({
    prefix: 'prefix--',
    suffix: '--suffix',
  });

  const classList = array1e5().map(() => generate());
  const uniqueList = unique(classList);

  generate.reset();

  is(uniqueList.length, LENGTH);
});

test('should be valid first character class name', () => {
  const generate = miniCssClassName();

  array1e5().forEach(() => {
    const className = generate();
    is(/[^a-z_]/i.test(className[0]), false);
  });

  generate.reset();
});

test('should reset', () => {
  const generate = miniCssClassName();

  const list1 = array1e5().map(() => generate());

  generate.reset();

  const list2 = array1e5().map(() => generate());

  generate.reset();

  equal(list1, list2);
});

test.run();
