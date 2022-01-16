const { test } = require('uvu');
const { is } = require('uvu/assert');

const createLocalIdent = require('../css-loader');
const { mockCSSLoader } = require('./util');

test('should be alphabet a queue', () => {
  const run = mockCSSLoader(createLocalIdent());

  is(run('one'), 'a');
  is(run('two'), 'b');
  is(run('three'), 'c');
});

test('should return equal class names', () => {
  const run = mockCSSLoader(createLocalIdent());
  const localName = 'test';

  is(run(localName), run(localName));
});

test('should return NOT equal class names', () => {
  const run = mockCSSLoader(createLocalIdent());

  is.not(run('x'), run('y'));
});

test.run();
