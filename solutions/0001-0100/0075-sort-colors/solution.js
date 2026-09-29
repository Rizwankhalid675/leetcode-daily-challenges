/**
 * 75. Sort Colors
 * https://leetcode.com/problems/sort-colors/
 * Dutch national flag partition: low/mid/high pointers, one pass, O(1) space, in place.
 */
var sortColors = function (nums) {
  let lo = 0, mid = 0, hi = nums.length - 1;
  while (mid <= hi) {
    if (nums[mid] === 0) {
      [nums[lo], nums[mid]] = [nums[mid], nums[lo]];
      lo++;
      mid++;
    } else if (nums[mid] === 2) {
      [nums[mid], nums[hi]] = [nums[hi], nums[mid]];
      hi--;
    } else {
      mid++;
    }
  }
};

module.exports = { sortColors };
