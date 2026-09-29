/**
 * 64. Minimum Path Sum
 * https://leetcode.com/problems/minimum-path-sum/
 * Row-by-row DP in one array: dp[c] = grid value + min(from above (old dp[c]), from the left
 * (new dp[c-1])).
 */
var minPathSum = function (grid) {
  const n = grid[0].length;
  const dp = new Array(n).fill(Infinity);
  dp[0] = 0;
  for (const row of grid) {
    dp[0] += row[0];
    for (let c = 1; c < n; c++) dp[c] = row[c] + Math.min(dp[c], dp[c - 1]);
  }
  return dp[n - 1];
};

module.exports = { minPathSum };
