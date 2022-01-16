const { test } = require('uvu');
const { is } = require('uvu/assert');

const { array1e5 } = require('./util');
const miniCssClassName = require('..');

test('should be keep only alphabet characters', () => {
  const regex = /[^a-z]/gi;
  const generate = miniCssClassName({ excludePattern: regex });

  array1e5().forEach(() => {
    const className = generate();
    is(regex.test(className), false);
  });

  generate.reset();
});

test.run();
