/**
 * 53. Maximum Subarray
 * https://leetcode.com/problems/maximum-subarray/
 * Kadane's algorithm: the best subarray ending at i either extends the best one ending at i-1 or
 * starts fresh at i; track the maximum over all i.
 */
var maxSubArray = function (nums) {
  let best = nums[0], cur = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(cur + nums[i], nums[i]);
    if (cur > best) best = cur;
  }
  return best;
};

module.exports = { maxSubArray };
