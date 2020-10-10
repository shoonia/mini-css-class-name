const { unique, array1e5, LENGTH } = require('./util');

const miniClassName = require('../index.js');

describe('Create className', () => {
  it('should be 100 000 unique className', () => {
    const generate = miniClassName();
    const classList = array1e5().map(() => generate());
    const uniqueList = unique(classList);

    generate.reset();
    expect(uniqueList.length).toBe(LENGTH);
  });

  it('should be 100 000 unique className with prefix', () => {
    const generate = miniClassName({
      prefix: 'prefix--',
    });

    const classList = array1e5().map(() => generate());
    const uniqueList = unique(classList);

    generate.reset();
    expect(uniqueList.length).toBe(LENGTH);
  });

  it('should be 100 000 unique className with suffix', () => {
    const generate = miniClassName({
      suffix: '--suffix',
    });

    const classList = array1e5().map(() => generate());
    const uniqueList = unique(classList);

    generate.reset();
    expect(uniqueList.length).toBe(LENGTH);
  });

  it('should be 100 000 unique className with suffix and prefix', () => {
    const generate = miniClassName({
      prefix: 'prefix--',
      suffix: '--suffix',
    });

    const classList = array1e5().map(() => generate());
    const uniqueList = unique(classList);

    generate.reset();
    expect(uniqueList.length).toBe(LENGTH);
  });

  it('should be valid first character class name', () => {
    const generate = miniClassName();

    array1e5().forEach(() => {
      const className = generate();
      expect(/[^a-z_]/i.test(className[0])).toBeFalsy();
    });

    generate.reset();
  });

  it('should be reset', () => {
    const generate = miniClassName();

    const list1 = array1e5().map(() => generate());
    generate.reset();

    const list2 = array1e5().map(() => generate());
    generate.reset();

    expect(list1.join()).toBe(list2.join());
  });
});
