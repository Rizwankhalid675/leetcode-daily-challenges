/**
 * 2635. Apply Transform Over Each Element in Array
 * https://leetcode.com/problems/apply-transform-over-each-element-in-array/
 * Plain indexed loop writing fn(arr[i], i) into a preallocated result (no Array.prototype.map).
 */
/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var map = function (arr, fn) {
  const res = new Array(arr.length);
  for (let i = 0; i < arr.length; i++) res[i] = fn(arr[i], i);
  return res;
};

module.exports = { map };
