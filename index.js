const increment = (acc, start, end) => {
  let i = 0;
  while (true) {
    if (acc.length === i) {
      acc.push(0);
      return;
    }
    if (acc[i] < start) {
      ++acc[i];
      return;
    }
    acc[i++] = 0;
    start = end;
  }
};

const createClassName = (acc, chars) => {
  let i = 0;
  let className = '';

  while (i < acc.length) {
    className += chars[acc[i++]];
  }

  return className;
};

const ex = (message) => new TypeError(`mini-css-class-name: ${message}`);

const hasInvalidChars = (string) => /[^\w-]/.test(string);

const hasInvalidStartChar = (char) => /[^a-z_]/i.test(char);

module.exports = ({
  prefix = '',
  suffix = '',
  excludePattern,
} = {}) => {
  if (typeof prefix !== 'string') {
    throw ex('`prefix` must be a String');
  }

  if (typeof suffix !== 'string') {
    throw ex('`suffix` must be a String');
  }

  if (excludePattern != null && !(excludePattern instanceof RegExp)) {
    throw ex('`excludePattern` must be a RegExp');
  }

  if (hasInvalidChars(prefix) || hasInvalidChars(suffix)) {
    throw ex('`prefix` and `suffix` can contain only the characters [a-zA-Z0-9], plus the hyphen (-) and the underscore (_)');
  }

  if (hasInvalidStartChar(prefix[0])) {
    throw ex('`prefix` cannot start with a digit or hyphens');
  }

  let firstChar = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_';
  let afterChar = `${firstChar}-0123456789`;

  if (excludePattern != null) {
    firstChar = firstChar.replace(excludePattern, '');
    afterChar = afterChar.replace(excludePattern, '');
  }

  const AFTER_LENGTH = afterChar.length - 1;
  const START_LENGTH = prefix.length < 1 ? firstChar.length - 1 : AFTER_LENGTH;

  const accumulator = [];

  const generate = prefix || suffix
    ? () => (
      increment(accumulator, START_LENGTH, AFTER_LENGTH),
      prefix + createClassName(accumulator, afterChar) + suffix
    )
    : () => (
      increment(accumulator, START_LENGTH, AFTER_LENGTH),
      createClassName(accumulator, afterChar)
    );

  generate.getAccumulator = () => [...accumulator];

  generate.setAccumulator = (acc) => {
    accumulator.length = 0;
    accumulator.push(...acc);

    return acc;
  };

  generate.reset = () => {
    accumulator.length = 0;
  };

  return generate;
};
