/**
 * 212. Word Search II
 * https://leetcode.com/problems/word-search-ii/
 * Put all words in a trie, then backtrack from every cell following trie edges. A found word is
 * cleared from its node and exhausted trie branches are deleted, so later searches skip them.
 */
var findWords = function (board, words) {
  const root = { next: {}, word: null };
  for (const w of words) {
    let node = root;
    for (const ch of w) node = node.next[ch] || (node.next[ch] = { next: {}, word: null });
    node.word = w;
  }
  const m = board.length, n = board[0].length;
  const found = [];
  const isEmpty = (obj) => { for (const _ in obj) return false; return true; };
  const dfs = (r, c, parent) => {
    const ch = board[r][c];
    const node = parent.next[ch];
    if (node === undefined) return;
    if (node.word !== null) {
      found.push(node.word);
      node.word = null;
    }
    board[r][c] = '#';
    if (r > 0) dfs(r - 1, c, node);
    if (r < m - 1) dfs(r + 1, c, node);
    if (c > 0) dfs(r, c - 1, node);
    if (c < n - 1) dfs(r, c + 1, node);
    board[r][c] = ch;
    if (node.word === null && isEmpty(node.next)) delete parent.next[ch];
  };
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) dfs(r, c, root);
  }
  return found;
};

module.exports = { findWords };
