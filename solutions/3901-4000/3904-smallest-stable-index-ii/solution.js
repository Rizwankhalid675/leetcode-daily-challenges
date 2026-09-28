/**
 * 3904. Smallest Stable Index II
 * https://leetcode.com/problems/smallest-stable-index-ii/
 *
 * Same scoring as Part I but n <= 1e5. Precompute suffix minimums right-to-left once,
 * then sweep left-to-right with a running prefix maximum: O(n) total.
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var firstStableIndex = function (nums, k) {
  const n = nums.length;
  const suffixMin = new Array(n);
  suffixMin[n - 1] = nums[n - 1];
  for (let i = n - 2; i >= 0; i--) suffixMin[i] = Math.min(nums[i], suffixMin[i + 1]);

  let prefixMax = -Infinity;
  for (let i = 0; i < n; i++) {
    if (nums[i] > prefixMax) prefixMax = nums[i];
    if (prefixMax - suffixMin[i] <= k) return i;
  }
  return -1;
};

module.exports = { firstStableIndex };
