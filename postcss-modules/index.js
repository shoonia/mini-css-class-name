const miniCssClassName = require('../index.js');

/**
 * @typedef {Pick<Map<string, string>, 'has' | 'get' | 'set'>} CacheMap
 * @param {miniCssClassName.Options & { cache?: CacheMap }} [options] options
 * @returns {function(): string} Generate
 */
module.exports = ({ cache, ...options } = {}) => {
  const map = cache || new Map();
  const generate = miniCssClassName(options);

  return (name, filename) => {
    const key = filename + name;

    if (map.has(key)) {
      return map.get(key);
    }

    const className = generate();

    map.set(key, className);

    return className;
  };
};
