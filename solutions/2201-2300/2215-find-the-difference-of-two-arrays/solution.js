/**
 * 2215. Find the Difference of Two Arrays
 * https://leetcode.com/problems/find-the-difference-of-two-arrays/
 *
 * Build a Set from each array; each answer list is one set minus the other.
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[][]}
 */
var findDifference = function (nums1, nums2) {
  const a = new Set(nums1);
  const b = new Set(nums2);
  return [[...a].filter((x) => !b.has(x)), [...b].filter((x) => !a.has(x))];
};

module.exports = { findDifference };
