/**
 * 153. Find Minimum in Rotated Sorted Array
 * https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/
 * Binary search against the last element: if nums[mid] > nums[hi] the minimum is to the right of mid,
 * otherwise it is at mid or to its left.
 */
var findMin = function (nums) {
  let lo = 0, hi = nums.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] > nums[hi]) lo = mid + 1;
    else hi = mid;
  }
  return nums[lo];
};

module.exports = { findMin };
