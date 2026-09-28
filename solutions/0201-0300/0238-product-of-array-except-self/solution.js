/**
 * 238. Product of Array Except Self
 * https://leetcode.com/problems/product-of-array-except-self/
 *
 * answer[i] = (product of everything left of i) * (product of everything right of i).
 * First pass writes the left products into the answer; second pass multiplies in a running
 * right product. No division, O(1) extra space besides the output.
 *
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  const n = nums.length;
  const answer = new Array(n);
  let left = 1;
  for (let i = 0; i < n; i++) {
    answer[i] = left;
    left *= nums[i];
  }
  let right = 1;
  for (let i = n - 1; i >= 0; i--) {
    // "+ 0" turns a -0 (e.g. -3 * 0) into 0; JS numbers keep the sign of zero
    answer[i] = answer[i] * right + 0;
    right *= nums[i];
  }
  return answer;
};

module.exports = { productExceptSelf };
