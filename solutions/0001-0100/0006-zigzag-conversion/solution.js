/**
 * 6. Zigzag Conversion
 * https://leetcode.com/problems/zigzag-conversion/
 *
 * Simulate writing: walk the rows 0,1,...,numRows-1,numRows-2,...,1,0,... appending each
 * character to its row, bouncing at the top and bottom; then concatenate the rows.
 *
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  if (numRows === 1 || numRows >= s.length) return s;
  const rows = Array.from({ length: numRows }, () => []);
  let row = 0;
  let step = 1;
  for (const ch of s) {
    rows[row].push(ch);
    if (row === 0) step = 1;
    else if (row === numRows - 1) step = -1;
    row += step;
  }
  return rows.map((r) => r.join('')).join('');
};

module.exports = { convert };
