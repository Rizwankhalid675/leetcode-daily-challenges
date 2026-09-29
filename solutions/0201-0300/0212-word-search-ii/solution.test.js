const test = require('node:test');
const assert = require('node:assert');
const { findWords } = require('./solution');

// Independent oracle: plain per-word backtracking search.
function exists(board, word) {
  const m = board.length, n = board[0].length;
  const used = new Set();
  const go = (r, c, i) => {
    if (r < 0 || c < 0 || r >= m || c >= n || used.has(r * n + c) || board[r][c] !== word[i]) return false;
    if (i === word.length - 1) return true;
    used.add(r * n + c);
    const ok = go(r + 1, c, i + 1) || go(r - 1, c, i + 1) || go(r, c + 1, i + 1) || go(r, c - 1, i + 1);
    used.delete(r * n + c);
    return ok;
  };
  for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) if (go(r, c, 0)) return true;
  return false;
}

const sorted = (a) => [...a].sort();

test('official examples', () => {
  const board = [['o', 'a', 'a', 'n'], ['e', 't', 'a', 'e'], ['i', 'h', 'k', 'r'], ['i', 'f', 'l', 'v']];
  assert.deepStrictEqual(sorted(findWords(board, ['oath', 'pea', 'eat', 'rain'])), ['eat', 'oath']);
  assert.deepStrictEqual(findWords([['a', 'b'], ['c', 'd']], ['abcb']), []);
});

test('a cell cannot be reused; each word reported once', () => {
  assert.deepStrictEqual(findWords([['a', 'a']], ['aaa']), []);
  assert.deepStrictEqual(sorted(findWords([['a', 'a'], ['a', 'a']], ['a', 'aa', 'aaaa', 'aaaaa'])), ['a', 'aa', 'aaaa']);
});

test('board is restored and results match per-word oracle', () => {
  for (let t = 0; t < 300; t++) {
    const m = 1 + Math.floor(Math.random() * 4), n = 1 + Math.floor(Math.random() * 4);
    const board = Array.from({ length: m }, () => Array.from({ length: n }, () => 'abc'[Math.floor(Math.random() * 3)]));
    const words = [...new Set(Array.from({ length: 1 + Math.floor(Math.random() * 15) }, () =>
      Array.from({ length: 1 + Math.floor(Math.random() * 5) }, () => 'abc'[Math.floor(Math.random() * 3)]).join('')))];
    const copy = board.map((row) => row.slice());
    const got = sorted(findWords(board, words));
    assert.deepStrictEqual(board, copy);
    assert.deepStrictEqual(got, sorted(words.filter((w) => exists(copy, w))));
  }
});

test('12x12 board with 30000 words finishes quickly', () => {
  const board = Array.from({ length: 12 }, () => Array.from({ length: 12 }, () => 'ab'[Math.floor(Math.random() * 2)]));
  const words = new Set();
  while (words.size < 30000) {
    words.add(Array.from({ length: 1 + Math.floor(Math.random() * 10) }, () => 'abc'[Math.floor(Math.random() * 3)]).join(''));
  }
  const t0 = Date.now();
  findWords(board, [...words]);
  assert.ok(Date.now() - t0 < 2000);
});
