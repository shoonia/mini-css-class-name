const createLocalIdent = require('../css-loader');
const { mockCSSLoader } = require('./util');

describe('css-loader', () => {
  it('should return equal class names', () => {
    const run = mockCSSLoader(createLocalIdent());
    const localName = 'test';

    expect(run(localName)).toBe(run(localName));
  });

  it('should return NOT equal class names', () => {
    const run = mockCSSLoader(createLocalIdent());

    expect(run('x')).not.toBe(run('y'));
  });
});
