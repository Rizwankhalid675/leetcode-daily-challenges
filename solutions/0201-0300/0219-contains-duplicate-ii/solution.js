/**
 * 219. Contains Duplicate II
 * https://leetcode.com/problems/contains-duplicate-ii/
 *
 * Remember the latest index of each value; a repeat within distance k answers true.
 * (Keeping only the latest index is enough: it is the closest earlier occurrence.)
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
  const lastIndex = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (lastIndex.has(nums[i]) && i - lastIndex.get(nums[i]) <= k) return true;
    lastIndex.set(nums[i], i);
  }
  return false;
};

module.exports = { containsNearbyDuplicate };
