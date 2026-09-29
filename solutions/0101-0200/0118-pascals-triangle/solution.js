/**
 * 118. Pascal's Triangle
 * https://leetcode.com/problems/pascals-triangle/
 * Build row by row: each row starts and ends with 1, and every inner value is the sum of the two values above it.
 */
var generate = function (numRows) {
  const rows = [[1]];
  for (let i = 1; i < numRows; i++) {
    const prev = rows[i - 1];
    const row = [1];
    for (let j = 1; j < i; j++) row.push(prev[j - 1] + prev[j]);
    row.push(1);
    rows.push(row);
  }
  return rows;
};

module.exports = { generate };
