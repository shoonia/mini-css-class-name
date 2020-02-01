/**
 * @param {Array} acc - accumulator for string indexes
 * @param {number} index - currnet index
 * @param {number} start - the biggest possible index for current char
 * @param {number} end - the biggest possible index for next char
 * @returns {Array} recursive itself or increment value accumulator
 */
function increment(acc, index, start, end) {
  if (acc[index] === undefined) {
    acc.push(0);
    return acc;
  }

  if (acc[index] < start) {
    acc[index]++;
    return acc;
  }

  acc[index] = 0;

  return increment(acc, ++index, end, end);
}

/**
 * @param {Array} acc - accumulator with string indexes
 * @param {string} chars - set of letters
 * @returns {string} class name
 */
function createClassName(acc, chars) {
  let i = 0;
  let className = "";

  while (i < acc.length) {
    className += chars[acc[i++]];
  }

  return className;
}

/**
 * @param {number} size - length of hash
 * @param {string} chars - set of letters
 * @returns {string} random string
 */
function createHash(size, chars) {
  let hash = "";

  while (0 < size--) {
    hash += chars[(Math.random() * chars.length) | 0];
  }

  return hash;
}

/**
 * @param {string} message - validation error
 * @returns {TypeError} error
 */
function error(message) {
  return new TypeError("mini-css-class-name: " + message);
}

/**
 * @param {string} s - custom prefix or suffix
 * @returns {boolean} has invalid chars
 */
function hasInvalidChars(s) {
  return /[^\w-]/.test(s);
}

/**
 * @param {string} prefix - custom prefix
 * @returns {boolean} has invalid first char
 */
function hasInvalidStartChar(prefix) {
  return /[^a-z_]/i.test(prefix[0]);
}

/**
 * @typedef {object} Options
 * @property {string} [prefix = ""] A custom prefix will be added to each class name
 * @property {string} [suffix = ""] A custom suffix will be added to each class name
 * @property {number} [hash = 0] A length of generating a random hash tail for each class name
 * @property {RegExp|null} [excludePattern = null] A regular expression for removing characters
 */

/**
 * @param {Options} - options generation
 * @returns {Function} generate()
 */
module.exports = function ({
  prefix = "",
  suffix = "",
  hash = 0,
  excludePattern = null,
} = {}) {
  if (typeof prefix !== "string") {
    throw error("`prefix` must be a String");
  }

  if (typeof suffix !== "string") {
    throw error("`suffix` must be a String");
  }

  if (typeof hash !== "number") {
    throw error("`hash` must be a Number");
  }

  if (excludePattern !== null && !(excludePattern instanceof RegExp)) {
    throw error("`excludePattern` must be a RegExp");
  }

  if (hasInvalidChars(prefix) || hasInvalidChars(suffix)) {
    throw error("`prefix` and `suffix` can contain only the characters [a-zA-Z0-9], plus the hyphen (-) and the underscore (_);");
  }

  if (hasInvalidStartChar(prefix)) {
    throw error("`prefix` cannot start with a digit or hyphens");
  }

  let firstChar = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";
  let afterChar = firstChar + "-0123456789";

  if (excludePattern !== null) {
    firstChar = firstChar.replace(excludePattern, "");
    afterChar = afterChar.replace(excludePattern, "");
  }

  const FIRST_LENGTH = firstChar.length - 1;
  const AFTER_LENGTH = afterChar.length - 1;
  const START_LENGTH = (prefix.length < 1) ? FIRST_LENGTH : AFTER_LENGTH;

  const getHash = (hash > 0)
    ? createHash.bind(null, hash, afterChar)
    : function () { return ""; };

  const accumulator = [];

  /**
   * @returns {string} unique class name
   */
  function generate() {
    const acc = increment(accumulator, 0, START_LENGTH, AFTER_LENGTH);
    const className = createClassName(acc, afterChar);

    return prefix + className + suffix + getHash();
  }

  generate.reset = function () {
    accumulator.length = 0;
  };

  generate.createHash = function (size = hash, chars = afterChar) {
    return createHash(size, chars);
  };

  return generate;
};
