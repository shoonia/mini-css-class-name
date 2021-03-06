const miniClassName = require('../index.js');

/**
 * @param {miniClassName.Options} [options] options
 * @returns {function(): string} Generate
 */
module.exports = (options) => {
  /** @type {Map<string, string>} */
  const cache = new Map();
  const generate = miniClassName(options);

  return (context, _, localName) => {
    /** @type {string} */
    const key = context.resourcePath + localName;

    if (cache.has(key)) {
      return cache.get(key);
    }

    const className = generate();

    cache.set(key, className);

    return className;
  };
};
