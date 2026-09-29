/**
 * 918. Maximum Sum Circular Subarray
 * https://leetcode.com/problems/maximum-sum-circular-subarray/
 * A circular answer is either an ordinary subarray (Kadane max) or the whole array minus an ordinary
 * subarray (total - Kadane min). If every number is negative, only the first case is valid.
 */
var maxSubarraySumCircular = function (nums) {
  let total = 0;
  let curMax = 0, best = -Infinity;
  let curMin = 0, worst = Infinity;
  for (const x of nums) {
    total += x;
    curMax = Math.max(curMax + x, x);
    best = Math.max(best, curMax);
    curMin = Math.min(curMin + x, x);
    worst = Math.min(worst, curMin);
  }
  return best < 0 ? best : Math.max(best, total - worst);
};

module.exports = { maxSubarraySumCircular };
