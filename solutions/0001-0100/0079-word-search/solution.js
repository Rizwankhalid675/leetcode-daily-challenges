/**
 * 79. Word Search
 * https://leetcode.com/problems/word-search/
 * Backtracking from each cell, marking the path in place. Cheap pre-checks: fail if the board lacks
 * enough of some letter, and search the word reversed when its last letter is rarer than its first.
 */
var exist = function (board, word) {
  const m = board.length, n = board[0].length;
  if (word.length > m * n) return false;
  const have = {}, need = {};
  for (const row of board) for (const ch of row) have[ch] = (have[ch] || 0) + 1;
  for (const ch of word) need[ch] = (need[ch] || 0) + 1;
  for (const ch in need) if ((have[ch] || 0) < need[ch]) return false;
  // Start from the rarer end: fewer starting points, less branching.
  if (have[word[0]] > have[word[word.length - 1]]) word = word.split('').reverse().join('');
  const dfs = (r, c, i) => {
    if (board[r][c] !== word[i]) return false;
    if (i === word.length - 1) return true;
    board[r][c] = '#';
    const found =
      (r > 0 && dfs(r - 1, c, i + 1)) ||
      (r < m - 1 && dfs(r + 1, c, i + 1)) ||
      (c > 0 && dfs(r, c - 1, i + 1)) ||
      (c < n - 1 && dfs(r, c + 1, i + 1));
    board[r][c] = word[i];
    return found;
  };
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) if (dfs(r, c, 0)) return true;
  }
  return false;
};

module.exports = { exist };
