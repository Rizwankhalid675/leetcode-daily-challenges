/**
 * 189. Rotate Array
 * https://leetcode.com/problems/rotate-array/
 *
 * Rotating right by k = reverse the whole array, then reverse the first k and the last
 * n - k elements separately. In place, O(1) extra space. k can exceed n, so use k % n.
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  const n = nums.length;
  k %= n;
  const reverse = (lo, hi) => {
    for (; lo < hi; lo++, hi--) [nums[lo], nums[hi]] = [nums[hi], nums[lo]];
  };
  reverse(0, n - 1);
  reverse(0, k - 1);
  reverse(k, n - 1);
};

module.exports = { rotate };
