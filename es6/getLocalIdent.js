import miniClassName from "./miniClassNames.js";

/**
 * @param {import('./miniClassNames').Options} options
 * @returns getLocalIdent
 */
export default function (options) {
  const generate = miniClassName(options);
  const cache = new Map();

  return function (context, _, localName) {
    const key = context.resourcePath + localName;

    if (cache.has(key)) {
      return cache.get(key);
    }

    const className = generate();

    cache.set(key, className);

    return className;
  };
}
