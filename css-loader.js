const miniClassName = require("./index.js");

/**
 * @param {miniClassName.Options} options options generation
 * @returns {function(): string} generate()
 */
module.exports = (options) => {
  const generate = miniClassName(options);
  /**@type {Map<string, string>} */
  const cache = new Map();

  return (context, _, localName) => {
    /**@type {string} */
    const key = context.resourcePath + localName;

    if (cache.has(key)) {
      return cache.get(key);
    }

    const className = generate();

    cache.set(key, className);

    return className;
  };
};
