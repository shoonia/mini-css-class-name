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

function createHash(chars, size) {
  let hash = "";

  while (0 < size--) {
    hash += chars[(Math.random() * chars.length) | 0];
  }

  return hash;
}

function error(message) {
  return new TypeError("mini-css-class-name: " + message);
}

export default function ({ prefix = "", suffix = "", hash = 0 } = {}) {
  if (typeof prefix !== "string") {
    throw error("prefix must be a String");
  }

  if (typeof suffix !== "string") {
    throw error("suffix must be a String");
  }

  if (typeof hash !== "number") {
    throw error("hash must be a Number");
  }

  const firstChar = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";
  const afterChar = firstChar + "0123456789-";

  const FIRST_LENGTH = firstChar.length - 1;
  const AFTER_LENGTH = afterChar.length - 1;
  const START_LENGH = (prefix.length < 1) ? FIRST_LENGTH : AFTER_LENGTH;

  const getHash = (hash > 0)
    ? createHash.bind(null, afterChar, hash)
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

  return generate;
}
