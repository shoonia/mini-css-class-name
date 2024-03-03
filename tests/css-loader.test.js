const { test } = require('node:test');
const { strictEqual, notStrictEqual } = require('node:assert/strict');

const createLocalIdent = require('../css-loader');
const { mockCSSLoader, resourcePath } = require('./util');

test('should be alphabet a queue', () => {
  const run = mockCSSLoader(createLocalIdent());

  strictEqual(run('one'), 'a');
  strictEqual(run('two'), 'b');
  strictEqual(run('three'), 'c');
});

test('should return equal class names', () => {
  const run = mockCSSLoader(createLocalIdent());
  const localName = 'test';

  strictEqual(run(localName), run(localName));
});

test('should return NOT equal class names', () => {
  const run = mockCSSLoader(createLocalIdent());

  notStrictEqual(run('x'), run('y'));
});

test('should use cache map', () => {
  const cache = new Map([
    [resourcePath + 'class-a', 'abc'],
    [resourcePath + 'class-b', 'xyz'],
  ]);

  const run = mockCSSLoader(createLocalIdent({ cache }));

  strictEqual(run('class-a'), 'abc');
  strictEqual(run('class-b'), 'xyz');
});
