const miniCssClassName = require('../index.js');

module.exports = ({ cache, ...options } = {}) => {
  const map = cache || new Map();
  const generate = miniCssClassName(options);

  return (context, _, localName) => {
    const key = context.resourcePath + localName;

    if (map.has(key)) {
      return map.get(key);
    }

    const className = generate();

    map.set(key, className);

    return className;
  };
};
