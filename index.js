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

  return growUp(acc, (index + 1), end, end);
}

function createClassName(acc, startChar, endChar) {
  let i = 1;
  let className = startChar[acc[0]];

  for (; i < acc.length; i++) {
    className += endChar[acc[i]];
  }

  return className;
}

function createHash(chars, size) {
  let hash = "";

  while (0 < size--) {
    hash += chars[(Math.random() * chars.length) | 0];
  }

  return hash;
}

module.exports = function ({ prefix = "", suffix = "", hash = 0 } = {}) {
  const firstChar = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";
  const afterChar = firstChar + "0123456789-";

  const FIRST_LENGTH = firstChar.length - 1;
  const AFTER_LENGTH = afterChar.length - 1;

  // If we have a prefix, we don't need the first char collection
  const startChar = (prefix.length < 1) ? firstChar : afterChar;
  const START_LENGH = (prefix.length < 1) ? FIRST_LENGTH : AFTER_LENGTH;

  const tail = [];

  let getHash;

  if (hash > 0) {
    getHash = createHash.bind(null, afterChar, hash);
  } else {
    getHash = function () {
      return "";
    };
  }

  function generate() {
    const acc = growUp(tail, 0, START_LENGH, AFTER_LENGTH);
    const className = createClassName(acc, startChar, afterChar);

    return prefix + className + suffix + getHash();
  };

  generate.reset = function () {
    tail.length = 0;
  }

  return generate;
}
