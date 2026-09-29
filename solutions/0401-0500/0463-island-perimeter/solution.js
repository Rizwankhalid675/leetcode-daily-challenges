/**
 * 463. Island Perimeter
 * https://leetcode.com/problems/island-perimeter/
 * Count 4 edges per land cell, minus 2 for every pair of land cells sharing a side (count only the right and down neighbors to avoid double counting).
 */
var islandPerimeter = function (grid) {
  const m = grid.length, n = grid[0].length;
  let land = 0, shared = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] !== 1) continue;
      land++;
      if (j + 1 < n && grid[i][j + 1] === 1) shared++;
      if (i + 1 < m && grid[i + 1][j] === 1) shared++;
    }
  }
  return 4 * land - 2 * shared;
};

module.exports = { islandPerimeter };
