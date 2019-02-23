const createClassName = require('./index.js');

module.exports = function (options) {
  const generate = createClassName(options);
  const map = new Map();

  return function (context, _, localName) {
    const key = context.resourcePath + localName;

    if (map.has(key)) {
      return map.get(key);
    }

    const className = generate();

    map.set(key, className);

    return className;
  }
}
