/**
 * 130. Surrounded Regions
 * https://leetcode.com/problems/surrounded-regions/
 * Only 'O' regions connected to the border survive. Flood-fill from every border 'O' (explicit stack),
 * mark those cells, then flip every unmarked 'O' to 'X' and restore the marked ones.
 */
var solve = function (board) {
  const m = board.length, n = board[0].length;
  const stack = [];
  const mark = (r, c) => {
    if (r >= 0 && r < m && c >= 0 && c < n && board[r][c] === 'O') {
      board[r][c] = '#';
      stack.push(r * n + c);
    }
  };
  for (let r = 0; r < m; r++) { mark(r, 0); mark(r, n - 1); }
  for (let c = 0; c < n; c++) { mark(0, c); mark(m - 1, c); }
  while (stack.length) {
    const id = stack.pop();
    const r = (id / n) | 0, c = id % n;
    mark(r - 1, c); mark(r + 1, c); mark(r, c - 1); mark(r, c + 1);
  }
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) board[r][c] = board[r][c] === '#' ? 'O' : 'X';
  }
};

module.exports = { solve };
