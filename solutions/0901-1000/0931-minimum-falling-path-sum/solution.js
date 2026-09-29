/**
 * 931. Minimum Falling Path Sum
 * https://leetcode.com/problems/minimum-falling-path-sum/
 * Row by row: best[j] = matrix[i][j] + min of the up to three cells above (j-1, j, j+1) from the previous row.
 */
var minFallingPathSum = function (matrix) {
  const n = matrix.length;
  let prev = matrix[0].slice();
  for (let i = 1; i < n; i++) {
    const cur = new Array(n);
    for (let j = 0; j < n; j++) {
      let m = prev[j];
      if (j > 0 && prev[j - 1] < m) m = prev[j - 1];
      if (j < n - 1 && prev[j + 1] < m) m = prev[j + 1];
      cur[j] = matrix[i][j] + m;
    }
    prev = cur;
  }
  return Math.min(...prev);
};

module.exports = { minFallingPathSum };
