/**
 * 31. Next Permutation
 * https://leetcode.com/problems/next-permutation/
 * Find the rightmost i with nums[i] < nums[i+1], swap it with the rightmost larger element to its right, then reverse the suffix. In place, returns nothing.
 */
var nextPermutation = function (nums) {
  const n = nums.length;
  let i = n - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) i--;
  if (i >= 0) {
    let j = n - 1;
    while (nums[j] <= nums[i]) j--;
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  for (let l = i + 1, r = n - 1; l < r; l++, r--) [nums[l], nums[r]] = [nums[r], nums[l]];
};

module.exports = { nextPermutation };
