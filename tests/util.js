const LENGTH = 200_000;
const array1e5 = Array(LENGTH).fill(null);
const resourcePath = '/app/doc/test.css';

const mockCSSLoader = (getLocalIdent) => {
  return (localName) => {
    return getLocalIdent({ resourcePath }, null, localName);
  };
};

module.exports = {
  unique: (list) => Array.from(new Set(list)),
  array1e5: () => array1e5.slice(),
  LENGTH,
  resourcePath,
  mockCSSLoader,
};
