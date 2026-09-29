/**
 * 41. First Missing Positive
 * https://leetcode.com/problems/first-missing-positive/
 * Use the array itself as a hash table: swap every value v in 1..n into slot v-1, then the first slot i not holding i+1 gives the answer.
 */
var firstMissingPositive = function (nums) {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
      const j = nums[i] - 1;
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
  }
  for (let i = 0; i < n; i++) if (nums[i] !== i + 1) return i + 1;
  return n + 1;
};

module.exports = { firstMissingPositive };
