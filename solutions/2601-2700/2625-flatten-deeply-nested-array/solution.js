/**
 * 2625. Flatten Deeply Nested Array
 * https://leetcode.com/problems/flatten-deeply-nested-array/
 * Recursive walk that pushes into one output array, descending into a subarray only while its depth is below n (no Array.prototype.flat).
 */
/**
 * @param {Array} arr
 * @param {number} depth
 * @return {Array}
 */
var flat = function (arr, n) {
  const res = [];
  const walk = (a, depth) => {
    for (const x of a) {
      if (Array.isArray(x) && depth < n) walk(x, depth + 1);
      else res.push(x);
    }
  };
  walk(arr, 0);
  return res;
};

module.exports = { flat };
