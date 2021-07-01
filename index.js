/**
 * @param {number[]} acc accumulator for string indexes
 * @param {number} index currnet index
 * @param {number} start the max possible index for current char
 * @param {number} end the max possible index for next char
 * @returns {number[]} accumulator
 */
const increment = (acc, index, start, end) => {
  if (acc.length === index) {
    acc.push(0);
    return acc;
  }

  if (acc[index] < start) {
    ++acc[index];
    return acc;
  }

  acc[index] = 0;

  return increment(acc, ++index, end, end);
};

/**
 * @param {number[]} acc accumulator with indexes
 * @param {string} chars set of letters
 * @returns {string} new class name
 */
const createClassName = (acc, chars) => {
  let i = 0;
  let className = '';

  while (i < acc.length) {
    className += chars[acc[i++]];
  }

  return className;
};

/**
 * @param {string} message validation error
 * @returns {TypeError} error
 */
const ex = (message) => new TypeError(`mini-css-class-name: ${message}`);

/**
 * @param {string} string custom prefix or suffix
 * @returns {boolean} has invalid chars
 */
const hasInvalidChars = (string) => /[^\w-]/.test(string);

/**
 * @param {string} char custom prefix
 * @returns {boolean} has invalid first char
 */
const hasInvalidStartChar = (char) => /[^a-z_]/i.test(char);

/**
 * @typedef {{
 * prefix?: string;
 * suffix?: string;
 * excludePattern?: RegExp | null;
 * }} Options
 */

/**
 * @param {Options} [options] generation
 * @returns {function(): string} Generate
 */
module.exports = ({
  prefix = '',
  suffix = '',
  excludePattern = null,
} = {}) => {
  if (typeof prefix !== 'string') {
    throw ex('`prefix` must be a String');
  }

  if (typeof suffix !== 'string') {
    throw ex('`suffix` must be a String');
  }

  if (excludePattern !== null && !(excludePattern instanceof RegExp)) {
    throw ex('`excludePattern` must be a RegExp');
  }

  if (hasInvalidChars(prefix) || hasInvalidChars(suffix)) {
    throw ex('`prefix` and `suffix` can contain only the characters [a-zA-Z0-9], plus the hyphen (-) and the underscore (_)');
  }

  if (hasInvalidStartChar(prefix[0])) {
    throw ex('`prefix` cannot start with a digit or hyphens');
  }

  let firstChar = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_';
  let afterChar =  `${firstChar}-0123456789`;

  if (excludePattern !== null) {
    firstChar = firstChar.replace(excludePattern, '');
    afterChar = afterChar.replace(excludePattern, '');
  }

  const FIRST_LENGTH = firstChar.length - 1;
  const AFTER_LENGTH = afterChar.length - 1;
  const START_LENGTH = (prefix.length < 1) ? FIRST_LENGTH : AFTER_LENGTH;

  /** @type {number[]} */
  const accumulator = [];

  /**
   * Generate
   *
   * @returns {string} unique class name
   */
  const generate = () => {
    const acc = increment(accumulator, 0, START_LENGTH, AFTER_LENGTH);
    const className = createClassName(acc, afterChar);

    return prefix + className + suffix;
  };

  /**
   * @memberof Generate
   * @returns {number[]} accumulator
   */
  generate.getAccumulator = () => [...accumulator];

  /**
   * @memberof Generate
   * @param {number[]} acc accumulator
   * @returns {number[]} accumulator
   */
  generate.setAccumulator = (acc) => {
    accumulator.length = 0;
    accumulator.push(...acc);

    return acc;
  };

  /**
   * @memberof Generate
   * @returns {void}
   */
  generate.reset = () => {
    accumulator.length = 0;
  };

  return generate;
};
