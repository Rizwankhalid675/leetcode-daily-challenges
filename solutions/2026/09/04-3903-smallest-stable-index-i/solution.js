/**
 * 3903. Smallest Stable Index I
 * https://leetcode.com/problems/smallest-stable-index-i/
 *
 * n <= 100, so compute each index's score directly: a running prefix max, and a fresh
 * scan for the suffix min. O(n^2) is intentional here; Part II needs the O(n) version.
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var firstStableIndex = function (nums, k) {
  let prefixMax = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    prefixMax = Math.max(prefixMax, nums[i]);
    let suffixMin = Infinity;
    for (let j = i; j < nums.length; j++) suffixMin = Math.min(suffixMin, nums[j]);
    if (prefixMax - suffixMin <= k) return i;
  }
  return -1;
};

module.exports = { firstStableIndex };
