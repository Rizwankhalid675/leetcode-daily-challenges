const test = require('node:test');
const assert = require('node:assert');
const { islandPerimeter } = require('./solution');

const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
function brute(grid) {
  const m = grid.length, n = grid[0].length;
  let p = 0;
  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) {
    if (!grid[i][j]) continue;
    for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const x = i + di, y = j + dj;
      if (x < 0 || y < 0 || x >= m || y >= n || !grid[x][y]) p++;
    }
  }
  return p;
}

test('official examples', () => {
  assert.strictEqual(islandPerimeter([[0, 1, 0, 0], [1, 1, 1, 0], [0, 1, 0, 0], [1, 1, 0, 0]]), 16);
  assert.strictEqual(islandPerimeter([[1]]), 4);
  assert.strictEqual(islandPerimeter([[1, 0]]), 4);
});

test('full block and single row', () => {
  assert.strictEqual(islandPerimeter([[1, 1], [1, 1]]), 8);
  assert.strictEqual(islandPerimeter([[1, 1, 1, 1]]), 10);
});

test('matches side-by-side exposure count on random grids', () => {
  for (let t = 0; t < 500; t++) {
    const m = ri(1, 8), n = ri(1, 8);
    const g = Array.from({ length: m }, () => Array.from({ length: n }, () => (Math.random() < 0.5 ? 1 : 0)));
    if (!g.flat().includes(1)) g[0][0] = 1;
    assert.strictEqual(islandPerimeter(g), brute(g)); // formula holds for any land set, not just one island
  }
});
