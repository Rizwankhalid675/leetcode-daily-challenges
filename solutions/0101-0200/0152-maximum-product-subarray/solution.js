/**
 * 152. Maximum Product Subarray
 * https://leetcode.com/problems/maximum-product-subarray/
 * Track the largest and smallest product of a subarray ending at each index (a negative number
 * swaps them). The answer is the best maximum seen; "+ 0" normalises a possible -0.
 */
var maxProduct = function (nums) {
  let hi = nums[0], lo = nums[0], best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const x = nums[i];
    const a = hi * x, b = lo * x;
    hi = Math.max(x, a, b);
    lo = Math.min(x, a, b);
    if (hi > best) best = hi;
  }
  return best + 0;
};

module.exports = { maxProduct };
