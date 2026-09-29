/**
 * 240. Search a 2D Matrix II
 * https://leetcode.com/problems/search-a-2d-matrix-ii/
 * Staircase search from the top-right corner: too big → move left, too small → move down. Each step discards a row or a column.
 */
var searchMatrix = function (matrix, target) {
  const m = matrix.length, n = matrix[0].length;
  let r = 0, c = n - 1;
  while (r < m && c >= 0) {
    const v = matrix[r][c];
    if (v === target) return true;
    if (v > target) c--;
    else r++;
  }
  return false;
};

module.exports = { searchMatrix };
