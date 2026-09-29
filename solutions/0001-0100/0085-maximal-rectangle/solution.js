/**
 * 85. Maximal Rectangle
 * https://leetcode.com/problems/maximal-rectangle/
 * Treat each row as the base of a histogram (heights = run of 1s above), then solve Largest Rectangle in Histogram with a monotonic stack and a zero sentinel.
 */
var maximalRectangle = function (matrix) {
  const rows = matrix.length, cols = matrix[0].length;
  const h = new Int32Array(cols + 1); // h[cols] stays 0 as a sentinel
  const st = new Int32Array(cols + 1);
  let best = 0;
  for (let r = 0; r < rows; r++) {
    const row = matrix[r];
    for (let c = 0; c < cols; c++) h[c] = row[c] === '1' ? h[c] + 1 : 0;
    let top = 0;
    for (let c = 0; c <= cols; c++) {
      while (top > 0 && h[st[top - 1]] >= h[c]) {
        const height = h[st[--top]];
        const left = top > 0 ? st[top - 1] : -1;
        const area = height * (c - left - 1);
        if (area > best) best = area;
      }
      st[top++] = c;
    }
  }
  return best;
};

module.exports = { maximalRectangle };
