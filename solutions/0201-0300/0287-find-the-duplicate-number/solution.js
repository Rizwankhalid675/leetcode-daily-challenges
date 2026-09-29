/**
 * 287. Find the Duplicate Number
 * https://leetcode.com/problems/find-the-duplicate-number/
 * Treat i → nums[i] as a linked list; the duplicate value is the entry of its cycle, found with Floyd's algorithm without modifying the array.
 */
var findDuplicate = function (nums) {
  let slow = nums[0], fast = nums[nums[0]];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[nums[fast]];
  }
  let p = 0;
  while (p !== slow) {
    p = nums[p];
    slow = nums[slow];
  }
  return p;
};

module.exports = { findDuplicate };
