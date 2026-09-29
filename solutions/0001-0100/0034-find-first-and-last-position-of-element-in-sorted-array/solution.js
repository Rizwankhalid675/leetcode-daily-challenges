/**
 * 34. Find First and Last Position of Element in Sorted Array
 * https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/
 * Two lower-bound searches: the first index >= target and the first index >= target + 1. If they are
 * equal the target is absent; otherwise the range is [first, second - 1].
 */
var searchRange = function (nums, target) {
  const lowerBound = (x) => {
    let lo = 0, hi = nums.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (nums[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  };
  const start = lowerBound(target);
  if (start === nums.length || nums[start] !== target) return [-1, -1];
  return [start, lowerBound(target + 1) - 1];
};

module.exports = { searchRange };
