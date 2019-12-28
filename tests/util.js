const LENGTH = 100000;
const array1e5 = Array(LENGTH).fill(null);

module.exports = {
  unique: (list) => Array.from(new Set(list)),
  array1e5: () => array1e5.slice(),
  LENGTH,
};
