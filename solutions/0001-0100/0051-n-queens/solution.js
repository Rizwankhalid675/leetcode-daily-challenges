/**
 * 51. N-Queens
 * https://leetcode.com/problems/n-queens/
 * Row-by-row backtracking; three boolean arrays mark used columns and both diagonal families so each placement check is O(1).
 */
var solveNQueens = function (n) {
  const res = [];
  const colAt = new Array(n);
  const cols = new Array(n).fill(false);
  const d1 = new Array(2 * n).fill(false); // r + c
  const d2 = new Array(2 * n).fill(false); // r - c + n
  const place = (r) => {
    if (r === n) {
      const board = [];
      for (let i = 0; i < n; i++) board.push('.'.repeat(colAt[i]) + 'Q' + '.'.repeat(n - colAt[i] - 1));
      res.push(board);
      return;
    }
    for (let c = 0; c < n; c++) {
      if (cols[c] || d1[r + c] || d2[r - c + n]) continue;
      cols[c] = d1[r + c] = d2[r - c + n] = true;
      colAt[r] = c;
      place(r + 1);
      cols[c] = d1[r + c] = d2[r - c + n] = false;
    }
  };
  place(0);
  return res;
};

module.exports = { solveNQueens };
