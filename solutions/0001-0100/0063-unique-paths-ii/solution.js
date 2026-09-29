/**
 * 63. Unique Paths II
 * https://leetcode.com/problems/unique-paths-ii/
 * Rolling 1-D DP: dp[c] = paths to the current row at column c = paths from above (old dp[c]) + from
 * the left (new dp[c-1]), forced to 0 on obstacles.
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  const n = obstacleGrid[0].length;
  const dp = new Array(n).fill(0);
  dp[0] = 1;
  for (const row of obstacleGrid) {
    for (let c = 0; c < n; c++) {
      if (row[c] === 1) dp[c] = 0;
      else if (c > 0) dp[c] += dp[c - 1];
    }
  }
  return dp[n - 1];
};

module.exports = { uniquePathsWithObstacles };
