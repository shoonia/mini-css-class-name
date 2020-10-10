const miniClassName = require('../index.js');

describe('Errors', () => {
  const run = (ops) => () => miniClassName(ops);

  it('should be invalid options', () => {
    expect(run(null)).toThrow(TypeError);
  });

  it('should be invalid `prefix`', () => {
    const msg = 'mini-css-class-name: `prefix` must be a String';
    expect(run({ prefix: null })).toThrowError(msg);
    expect(run({ prefix: 6 })).toThrowError(msg);
  });

  it('should be invalid `prefix` char', () => {
    const msg = 'mini-css-class-name: `prefix` and `suffix` can contain only the characters [a-zA-Z0-9], plus the hyphen (-) and the underscore (_);';
    expect(run({ prefix: 'x--ß--' })).toThrowError(msg);
  });

  it('should be invalid first `prefix` char', () => {
    const msg = 'mini-css-class-name: `prefix` cannot start with a digit or hyphens';
    expect(run({ prefix: '5' })).toThrowError(msg);
    expect(run({ prefix: '-' })).toThrowError(msg);
  });

  it('should be invalid suffix', () => {
    const msg = 'mini-css-class-name: `suffix` must be a String';
    expect(run({ suffix: null })).toThrowError(msg);
    expect(run({ suffix: 0 })).toThrowError(msg);
  });

  it('should be invalid `suffix` char', () => {
    const msg = 'mini-css-class-name: `prefix` and `suffix` can contain only the characters [a-zA-Z0-9], plus the hyphen (-) and the underscore (_);';
    expect(run({ suffix: '--ß' })).toThrowError(msg);
  });

  it('should be invalid excludePattern', () => {
    const msg = 'mini-css-class-name: `excludePattern` must be a RegExp';
    expect(run({ excludePattern: '' })).toThrowError(msg);
    expect(run({ excludePattern: 1 })).toThrowError(msg);
  });

  // NO ERROR

  it('shouldn\'t be error, excludePattern is null', () => {
    const cb = miniClassName({ excludePattern: null });
    expect(typeof cb).toBe('function');
  });

  it('shouldn\'t be error, excludePattern is RegExp', () => {
    const cb = miniClassName({ excludePattern: /regex/ });
    expect(typeof cb).toBe('function');
  });
});
