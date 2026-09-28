/**
 * 643. Maximum Average Subarray I
 * https://leetcode.com/problems/maximum-average-subarray-i/
 *
 * Fixed-size sliding window: maintain the sum of the last k elements (add the new one,
 * subtract the one leaving) and track the maximum sum; divide once at the end.
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function (nums, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += nums[i];
  let best = sum;
  for (let i = k; i < nums.length; i++) {
    sum += nums[i] - nums[i - k];
    if (sum > best) best = sum;
  }
  return best / k;
};

module.exports = { findMaxAverage };
