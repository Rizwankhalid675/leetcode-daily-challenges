/**
 * 73. Set Matrix Zeroes
 * https://leetcode.com/problems/set-matrix-zeroes/
 *
 * O(1) extra space: use the first row and first column as marker storage. Remember
 * separately whether the first row / first column themselves contained a zero, mark,
 * clear the inner cells from the markers, then clear the first row/column if needed.
 *
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  const firstRowZero = matrix[0].some((v) => v === 0);
  const firstColZero = matrix.some((row) => row[0] === 0);
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      if (matrix[r][c] === 0) {
        matrix[r][0] = 0;
        matrix[0][c] = 0;
      }
    }
  }
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      if (matrix[r][0] === 0 || matrix[0][c] === 0) matrix[r][c] = 0;
    }
  }
  if (firstRowZero) matrix[0].fill(0);
  if (firstColZero) for (let r = 0; r < m; r++) matrix[r][0] = 0;
};

module.exports = { setZeroes };
