const miniClassName = require('..');

const msgPrefixString = 'mini-css-class-name: `prefix` must be a String';
const msgSuffixString = 'mini-css-class-name: `suffix` must be a String';
const msgPrefixStart = 'mini-css-class-name: `prefix` cannot start with a digit or hyphens';
const msgPefSufContain = 'mini-css-class-name: `prefix` and `suffix` can contain only the characters [a-zA-Z0-9], plus the hyphen (-) and the underscore (_)';
const msgRegExp = 'mini-css-class-name: `excludePattern` must be a RegExp';

describe('Errors', () => {
  const run = (ops) => () => miniClassName(ops);

  it('should be invalid options', () => {
    expect(run(null)).toThrow(TypeError);
  });

  it('should be invalid `prefix`', () => {
    expect(run({ prefix: null })).toThrowError(msgPrefixString);
    expect(run({ prefix: 6 })).toThrowError(msgPrefixString);
    expect(run({ prefix: /x/ })).toThrowError(msgPrefixString);
  });

  it('should be invalid `prefix` char', () => {
    expect(run({ prefix: 'x--ß--' })).toThrowError(msgPefSufContain);
  });

  it('should be invalid first `prefix` char', () => {
    expect(run({ prefix: '5' })).toThrowError(msgPrefixStart);
    expect(run({ prefix: '-' })).toThrowError(msgPrefixStart);
  });

  it('should be invalid suffix', () => {
    expect(run({ suffix: null })).toThrowError(msgSuffixString);
    expect(run({ suffix: 0 })).toThrowError(msgSuffixString);
    expect(run({ suffix: /y/ })).toThrowError(msgSuffixString);
  });

  it('should be invalid `suffix` char', () => {
    expect(run({ suffix: '--ß' })).toThrowError(msgPefSufContain);
  });

  it('should be invalid excludePattern', () => {
    expect(run({ excludePattern: '' })).toThrowError(msgRegExp);
    expect(run({ excludePattern: 1 })).toThrowError(msgRegExp);
  });

  // NO ERROR

  it('should not be error, excludePattern is null', () => {
    const cb = miniClassName({ excludePattern: null });
    expect(typeof cb).toBe('function');
  });

  it('should not be error, excludePattern is RegExp', () => {
    const cb = miniClassName({ excludePattern: /regex/ });
    expect(typeof cb).toBe('function');
  });
});
