function growUp(acc, index, start, end) {
  if (acc[index] === undefined) {
    acc.push(0);
    return acc;
  }

  if (acc[index] < start) {
    acc[index]++;
    return acc;
  }

  acc[index] = 0;

  return growUp(acc, ++index, end, end);
}

function createClassName(acc, chars) {
  let i = 0;
  let className = "";

  while (i < acc.length) {
    className += chars[acc[i++]];
  }

  return className;
}

function createHash(size, chars) {
  let hash = "";

  while (0 < size--) {
    hash += chars[(Math.random() * chars.length) | 0];
  }

  return hash;
}

function error(message) {
  return new TypeError("mini-css-class-name: " + message);
}

/**
 * @typedef {Object} Options
 * @property {string} [prefix = ""] A custom prefix will be added to each class name
 * @property {string} [suffix = ""] A custom suffix will be added to each class name
 * @property {number} [hash = 0] A length of generating a random hash tail for each class name
 * @property {RegExp} [excludePattern = null] A regular expression for removing characters
 */

/**
 * @param {Options}
 */
module.exports = function ({
  prefix = "",
  suffix = "",
  hash = 0,
  excludePattern = null,
} = {}) {
  if (typeof prefix !== "string") {
    throw error("prefix must be a String");
  }

  if (typeof suffix !== "string") {
    throw error("suffix must be a String");
  }

  if (typeof hash !== "number") {
    throw error("hash must be a Number");
  }

  if (excludePattern !== null && !(excludePattern instanceof RegExp)) {
    throw error("excludePattern must be a RegExp");
  }

  let firstChar = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";
  let afterChar = firstChar + "0123456789-";

  if (excludePattern !== null) {
    firstChar = firstChar.replace(excludePattern, "");
    afterChar = afterChar.replace(excludePattern, "");
  }

  const FIRST_LENGTH = firstChar.length - 1;
  const AFTER_LENGTH = afterChar.length - 1;
  const START_LENGH = (prefix.length < 1) ? FIRST_LENGTH : AFTER_LENGTH;

  const getHash = (hash > 0)
    ? createHash.bind(null, hash, afterChar)
    : function () { return ""; };

  const tail = [];

  function generate() {
    const acc = growUp(tail, 0, START_LENGH, AFTER_LENGTH);
    const className = createClassName(acc, afterChar);

    return prefix + className + suffix + getHash();
  }

  generate.reset = function () {
    tail.length = 0;
  };

  generate.createHash = function (size = hash, chars = afterChar) {
    return createHash(size, chars);
  };

  return generate;
};
