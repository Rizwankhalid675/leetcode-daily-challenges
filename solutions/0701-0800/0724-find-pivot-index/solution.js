/**
 * 724. Find Pivot Index
 * https://leetcode.com/problems/find-pivot-index/
 *
 * With the total known, the right sum at i is total - leftSum - nums[i]. Scan left to right
 * and return the first i where leftSum equals that.
 *
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function (nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  let leftSum = 0;
  for (let i = 0; i < nums.length; i++) {
    if (leftSum === total - leftSum - nums[i]) return i;
    leftSum += nums[i];
  }
  return -1;
};

module.exports = { pivotIndex };
