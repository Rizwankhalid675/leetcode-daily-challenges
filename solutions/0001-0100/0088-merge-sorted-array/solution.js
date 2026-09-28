/**
 * 88. Merge Sorted Array
 * https://leetcode.com/problems/merge-sorted-array/
 *
 * Fill nums1 from the back: repeatedly place the larger of the two current tails at the
 * end. Writing from the back never overwrites an unread nums1 element, because the write
 * index is always >= the read index of nums1.
 *
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  let i = m - 1;
  let j = n - 1;
  for (let w = m + n - 1; j >= 0; w--) {
    if (i >= 0 && nums1[i] > nums2[j]) nums1[w] = nums1[i--];
    else nums1[w] = nums2[j--];
  }
};

module.exports = { merge };
