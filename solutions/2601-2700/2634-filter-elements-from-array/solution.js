/**
 * 2634. Filter Elements from Array
 * https://leetcode.com/problems/filter-elements-from-array/
 * Loop once and push arr[i] whenever fn(arr[i], i) is truthy (no Array.prototype.filter).
 */
/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var filter = function (arr, fn) {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i)) res.push(arr[i]);
  }
  return res;
};

module.exports = { filter };
