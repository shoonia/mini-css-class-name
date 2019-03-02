const firstChar = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";
const afterChar = firstChar + "0123456789-";

const FIRST_LENGTH = firstChar.length - 1;
const AFTER_LENGTH = afterChar.length - 1;

const tail = [];

function growUp(acc, index, max) {
  if (acc[index] === undefined) {
    acc.push(0);
    return acc;
  }

  if (acc[index] < max) {
    acc[index]++;
    return acc;
  }

  acc[index] = 0;

  return growUp(acc, index + 1, AFTER_LENGTH);
}

function createClassName(acc) {
  let i = 1;
  let className = firstChar[acc[0]];

  for (; i < acc.length; i++) {
    className += afterChar[acc[i]];
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
  let getHash;

  if (hash > 0) {
    getHash = createHash.bind(null, afterChar, hash);
  } else {
    getHash = function () {
      return "";
    };
  }

  function generate() {
    const className = createClassName(growUp(tail, 0, FIRST_LENGTH));

    return `${prefix}${className}${suffix}${getHash()}`;
  };

  generate.reset = function () {
    tail.length = 0;
  }

  return generate;
}
