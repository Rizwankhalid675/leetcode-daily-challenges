/**
 * 120. Triangle
 * https://leetcode.com/problems/triangle/
 * Bottom-up DP on a copy of the last row: each cell becomes its value plus the smaller of the two
 * cells below it; dp[0] ends as the answer. O(n) extra space, input untouched.
 */
var minimumTotal = function (triangle) {
  const dp = triangle[triangle.length - 1].slice();
  for (let r = triangle.length - 2; r >= 0; r--) {
    for (let c = 0; c <= r; c++) dp[c] = triangle[r][c] + Math.min(dp[c], dp[c + 1]);
  }
  return dp[0];
};

module.exports = { minimumTotal };
