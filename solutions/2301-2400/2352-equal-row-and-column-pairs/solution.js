/**
 * 2352. Equal Row and Column Pairs
 * https://leetcode.com/problems/equal-row-and-column-pairs/
 *
 * Count rows by a string key; then build each column's key and add how many rows match it.
 *
 * @param {number[][]} grid
 * @return {number}
 */
var equalPairs = function (grid) {
  const n = grid.length;
  const rowCount = new Map();
  for (const row of grid) {
    const key = row.join(',');
    rowCount.set(key, (rowCount.get(key) ?? 0) + 1);
  }
  let pairs = 0;
  for (let c = 0; c < n; c++) {
    const col = [];
    for (let r = 0; r < n; r++) col.push(grid[r][c]);
    pairs += rowCount.get(col.join(',')) ?? 0;
  }
  return pairs;
};

module.exports = { equalPairs };
