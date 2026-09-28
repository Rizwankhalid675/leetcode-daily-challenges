/**
 * 167. Two Sum II - Input Array Is Sorted
 * https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/
 *
 * Converging pointers: too small a sum -> move the left pointer up; too large -> move the
 * right pointer down. Returns 1-indexed positions, O(1) extra space.
 *
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  let lo = 0;
  let hi = numbers.length - 1;
  while (lo < hi) {
    const sum = numbers[lo] + numbers[hi];
    if (sum === target) return [lo + 1, hi + 1];
    if (sum < target) lo++;
    else hi--;
  }
  return [-1, -1]; // unreachable: exactly one solution is guaranteed
};

module.exports = { twoSum };
