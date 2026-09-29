/**
 * 35. Search Insert Position
 * https://leetcode.com/problems/search-insert-position/
 * Lower-bound binary search: the first index whose value is >= target is both the position of the
 * target (if present) and where it would be inserted.
 */
var searchInsert = function (nums, target) {
  let lo = 0, hi = nums.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
};

module.exports = { searchInsert };
