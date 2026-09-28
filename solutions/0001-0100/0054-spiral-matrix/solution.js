/**
 * 54. Spiral Matrix
 * https://leetcode.com/problems/spiral-matrix/
 *
 * Walk the outer ring (top row, right column, bottom row, left column) and shrink the four
 * boundaries; the bottom/left legs are skipped when the remaining area is a single row or
 * column so nothing is visited twice.
 *
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  const out = [];
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) out.push(matrix[top][c]);
    for (let r = top + 1; r <= bottom; r++) out.push(matrix[r][right]);
    if (top < bottom) for (let c = right - 1; c >= left; c--) out.push(matrix[bottom][c]);
    if (left < right) for (let r = bottom - 1; r > top; r--) out.push(matrix[r][left]);
    top++;
    bottom--;
    left++;
    right--;
  }
  return out;
};

module.exports = { spiralOrder };
