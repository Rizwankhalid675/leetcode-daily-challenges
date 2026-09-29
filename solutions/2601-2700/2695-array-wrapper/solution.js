/**
 * 2695. Array Wrapper
 * https://leetcode.com/problems/array-wrapper/
 * valueOf returns the element sum (used by +) and toString returns the JSON-style "[a,b,...]" (used by String()).
 */
/**
 * @param {number[]} nums
 * @return {void}
 */
var ArrayWrapper = function (nums) {
  this.nums = nums;
};

/**
 * @return {number}
 */
ArrayWrapper.prototype.valueOf = function () {
  let sum = 0;
  for (const x of this.nums) sum += x;
  return sum;
};

/**
 * @return {string}
 */
ArrayWrapper.prototype.toString = function () {
  return JSON.stringify(this.nums);
};

/**
 * const obj1 = new ArrayWrapper([1,2]);
 * const obj2 = new ArrayWrapper([3,4]);
 * obj1 + obj2; // 10
 * String(obj1); // "[1,2]"
 * String(obj2); // "[3,4]"
 */

module.exports = { ArrayWrapper };
