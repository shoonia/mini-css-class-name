const miniCssClassName = require('../index.js');

/**
 * @param {miniCssClassName.Options} [options] options
 * @returns {function(): string} Generate
 */
module.exports = (options) => {
  /** @type {Map<string, string>} */
  const cache = new Map();
  const generate = miniCssClassName(options);

  return (name, filename) => {
    const key = filename + name;

    if (cache.has(key)) {
      return cache.get(key);
    }

    const className = generate();

    cache.set(key, className);

    return className;
  };
};
