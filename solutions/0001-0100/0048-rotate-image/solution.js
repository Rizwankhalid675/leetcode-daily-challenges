/**
 * 48. Rotate Image
 * https://leetcode.com/problems/rotate-image/
 *
 * Clockwise rotation = transpose (swap across the main diagonal) + reverse every row.
 * Both steps are in place.
 *
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
  }
  for (const row of matrix) row.reverse();
};

module.exports = { rotate };
