/**
 * 162. Find Peak Element
 * https://leetcode.com/problems/find-peak-element/
 *
 * Binary search on the slope: if nums[mid] < nums[mid+1] we are on an upward slope and a
 * peak must exist to the right (the array "falls" to -infinity past the end); otherwise
 * a peak exists at mid or to its left.
 *
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] < nums[mid + 1]) lo = mid + 1;
    else hi = mid;
  }
  return lo;
};

module.exports = { findPeakElement };
