/**
 * 80. Remove Duplicates from Sorted Array II
 * https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/
 *
 * Keep each value at most twice: write nums[i] unless it equals the element written two
 * slots back (then two copies are already kept). Sorted input makes that check sufficient.
 *
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let k = 0;
  for (const x of nums) {
    if (k < 2 || x !== nums[k - 2]) nums[k++] = x;
  }
  return k;
};

module.exports = { removeDuplicates };
