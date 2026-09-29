/**
 * 2677. Chunk Array
 * https://leetcode.com/problems/chunk-array/
 * Step i by size and push arr.slice(i, i + size); the last chunk is whatever is left.
 */
/**
 * @param {Array} arr
 * @param {number} size
 * @return {Array}
 */
var chunk = function (arr, size) {
  const res = [];
  for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size));
  return res;
};

module.exports = { chunk };
