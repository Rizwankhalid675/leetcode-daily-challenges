/**
 * 2724. Sort By
 * https://leetcode.com/problems/sort-by/
 * Compute each key once, sort [key, value] pairs numerically ascending, then unwrap, so fn runs n times instead of O(n log n).
 */
/**
 * @param {Array} arr
 * @param {Function} fn
 * @return {Array}
 */
var sortBy = function (arr, fn) {
  const pairs = arr.map((v) => [fn(v), v]);
  pairs.sort((a, b) => a[0] - b[0]);
  return pairs.map((p) => p[1]);
};

module.exports = { sortBy };
