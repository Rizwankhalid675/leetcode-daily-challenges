/**
 * 221. Maximal Square
 * https://leetcode.com/problems/maximal-square/
 * side[i][j] = largest all-1 square with bottom-right corner (i, j) = 1 + min(up, left, up-left) when the cell is "1". Roll it into one row; the answer is the max side squared.
 */
var maximalSquare = function (matrix) {
  const cols = matrix[0].length;
  const dp = new Array(cols + 1).fill(0); // dp[j + 1] = side ending at column j in the current row
  let best = 0;
  for (const row of matrix) {
    let diag = 0; // previous row's value one column to the left (up-left)
    for (let j = 0; j < cols; j++) {
      const up = dp[j + 1];
      if (row[j] === '1') {
        dp[j + 1] = 1 + Math.min(up, dp[j], diag);
        if (dp[j + 1] > best) best = dp[j + 1];
      } else {
        dp[j + 1] = 0;
      }
      diag = up;
    }
  }
  return best * best;
};

module.exports = { maximalSquare };
