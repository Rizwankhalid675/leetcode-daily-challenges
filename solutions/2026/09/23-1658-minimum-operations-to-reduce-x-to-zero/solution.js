/**
 * 1658. Minimum Operations to Reduce X to Zero
 * https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero/
 *
 * Removing some elements from the left and some from the right leaves a contiguous middle
 * block. Removed sum == x  <=>  kept middle sum == total - x. Minimizing removals means
 * maximizing the kept block, and with all values positive a sliding window finds the
 * longest subarray with an exact sum.
 *
 * @param {number[]} nums
 * @param {number} x
 * @return {number}
 */
var minOperations = function (nums, x) {
  const n = nums.length;
  let total = 0;
  for (const v of nums) total += v;
  const keep = total - x;
  if (keep < 0) return -1; // even removing everything is not enough
  if (keep === 0) return n; // remove everything

  let longest = -1;
  let left = 0;
  let sum = 0;
  for (let right = 0; right < n; right++) {
    sum += nums[right];
    while (sum > keep) sum -= nums[left++];
    if (sum === keep) longest = Math.max(longest, right - left + 1);
  }
  return longest === -1 ? -1 : n - longest;
};

module.exports = { minOperations };
