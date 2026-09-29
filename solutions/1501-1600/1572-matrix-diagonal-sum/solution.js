/**
 * 1572. Matrix Diagonal Sum
 * https://leetcode.com/problems/matrix-diagonal-sum/
 * Add mat[i][i] and mat[i][n-1-i] for every row; when n is odd the centre was counted twice, so subtract it once.
 */
var diagonalSum = function (mat) {
  const n = mat.length;
  let s = 0;
  for (let i = 0; i < n; i++) s += mat[i][i] + mat[i][n - 1 - i];
  if (n % 2 === 1) s -= mat[n >> 1][n >> 1];
  return s;
};

module.exports = { diagonalSum };
