/**
 * 1493. Longest Subarray of 1's After Deleting One Element
 * https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/
 *
 * Longest window with at most one zero; after deleting one element of that window the
 * remaining ones have length (window - 1). Deleting is mandatory, so an all-ones array
 * also loses one element; (window - 1) covers that case too.
 *
 * @param {number[]} nums
 * @return {number}
 */
var longestSubarray = function (nums) {
  let left = 0;
  let zeros = 0;
  let best = 0;
  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) zeros++;
    while (zeros > 1) {
      if (nums[left] === 0) zeros--;
      left++;
    }
    best = Math.max(best, right - left); // window length minus the deleted element
  }
  return best;
};

module.exports = { longestSubarray };
