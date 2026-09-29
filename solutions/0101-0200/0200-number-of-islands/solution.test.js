const test = require('node:test');
const assert = require('node:assert');
const { numIslands } = require('./solution');

// Independent oracle: union-find over land cells.
function countUF(grid) {
  const m = grid.length, n = grid[0].length;
  const p = Array.from({ length: m * n }, (_, i) => i);
  const find = (x) => (p[x] === x ? x : (p[x] = find(p[x])));
  for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) {
    if (grid[r][c] !== '1') continue;
    if (r + 1 < m && grid[r + 1][c] === '1') p[find(r * n + c)] = find((r + 1) * n + c);
    if (c + 1 < n && grid[r][c + 1] === '1') p[find(r * n + c)] = find(r * n + c + 1);
  }
  let k = 0;
  for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) if (grid[r][c] === '1' && find(r * n + c) === r * n + c) k++;
  return k;
}

test('official examples', () => {
  assert.strictEqual(numIslands([
    ['1', '1', '1', '1', '0'], ['1', '1', '0', '1', '0'], ['1', '1', '0', '0', '0'], ['0', '0', '0', '0', '0'],
  ]), 1);
  assert.strictEqual(numIslands([
    ['1', '1', '0', '0', '0'], ['1', '1', '0', '0', '0'], ['0', '0', '1', '0', '0'], ['0', '0', '0', '1', '1'],
  ]), 3);
});

test('edge cases', () => {
  assert.strictEqual(numIslands([['0']]), 0);
  assert.strictEqual(numIslands([['1']]), 1);
  assert.strictEqual(numIslands([['1', '0', '1', '0', '1']]), 3);
  assert.strictEqual(numIslands([['1', '0'], ['0', '1']]), 2); // diagonal does not connect
});

test('matches union-find on random grids', () => {
  for (let t = 0; t < 500; t++) {
    const m = 1 + Math.floor(Math.random() * 7), n = 1 + Math.floor(Math.random() * 7);
    const g = Array.from({ length: m }, () => Array.from({ length: n }, () => (Math.random() < 0.5 ? '1' : '0')));
    assert.strictEqual(numIslands(g), countUF(g));
  }
});

test('300x300 all land and a serpentine path run without stack overflow', () => {
  const full = Array.from({ length: 300 }, () => Array(300).fill('1'));
  const snake = Array.from({ length: 300 }, (_, r) => Array.from({ length: 300 }, (_, c) =>
    r % 2 === 0 || (r % 4 === 1 ? c === 299 : c === 0) ? '1' : '0'));
  const t0 = Date.now();
  assert.strictEqual(numIslands(full), 1);
  assert.strictEqual(numIslands(snake), 1);
  assert.ok(Date.now() - t0 < 1000);
});
