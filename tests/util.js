const LENGTH = 100000;
const array1e5 = Array(LENGTH).fill(null);

const mockCSSLoader = (getLocalIdent) => {
  const mockContext = {
    resourcePath: "/app/doc/test.css"
  };

  return (localName) => {
    return getLocalIdent(mockContext, null, localName);
  };
};

module.exports = {
  unique: (list) => Array.from(new Set(list)),
  array1e5: () => array1e5.slice(),
  LENGTH,
  mockCSSLoader,
};
