const createLocalIdent = require('../css-loader');
const { mockCSSLoader } = require('./util');

describe('css-loader', () => {
  it('should be alphabet a queue', () => {
    const run = mockCSSLoader(createLocalIdent());

    expect(run('one')).toBe('a');
    expect(run('two')).toBe('b');
    expect(run('three')).toBe('c');
  });

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
