/**
 * 1929. Concatenation of Array
 * https://leetcode.com/problems/concatenation-of-array/
 * Build the 2n-length answer directly: ans[i] = ans[i + n] = nums[i].
 */
var getConcatenation = function (nums) {
  const n = nums.length;
  const ans = new Array(2 * n);
  for (let i = 0; i < n; i++) ans[i] = ans[i + n] = nums[i];
  return ans;
};

module.exports = { getConcatenation };
