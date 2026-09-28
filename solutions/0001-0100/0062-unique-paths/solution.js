/**
 * 62. Unique Paths
 * https://leetcode.com/problems/unique-paths/
 *
 * paths(r, c) = paths(r-1, c) + paths(r, c-1); a single row array is enough because
 * row[c] still holds the value from the row above when we add row[c-1] (this row).
 *
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  const row = new Array(n).fill(1); // first row: one way to reach each cell
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) row[c] += row[c - 1];
  }
  return row[n - 1];
};

module.exports = { uniquePaths };
