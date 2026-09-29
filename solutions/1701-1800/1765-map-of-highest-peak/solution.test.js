const test = require('node:test');
const assert = require('node:assert');
const { highestPeak } = require('./solution');

const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
function brute(g) {
  const m = g.length, n = g[0].length;
  const water = [];
  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) if (g[i][j]) water.push([i, j]);
  return g.map((row, i) => row.map((_, j) => Math.min(...water.map(([a, b]) => Math.abs(a - i) + Math.abs(b - j)))));
}
function isValid(g, h) {
  const m = g.length, n = g[0].length;
  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) {
    if (h[i][j] < 0) return false;
    if (g[i][j] && h[i][j] !== 0) return false;
    if (i + 1 < m && Math.abs(h[i][j] - h[i + 1][j]) > 1) return false;
    if (j + 1 < n && Math.abs(h[i][j] - h[i][j + 1]) > 1) return false;
  }
  return true;
}

test('official examples', () => {
  assert.deepStrictEqual(highestPeak([[0, 1], [0, 0]]), [[1, 0], [2, 1]]);
  const out = highestPeak([[0, 0, 1], [1, 0, 0], [0, 0, 0]]);
  assert.ok(isValid([[0, 0, 1], [1, 0, 0], [0, 0, 0]], out));
  assert.strictEqual(Math.max(...out.flat()), 2);
});

test('returns plain arrays of numbers', () => {
  const out = highestPeak([[1]]);
  assert.ok(Array.isArray(out) && Array.isArray(out[0]));
  assert.deepStrictEqual(out, [[0]]);
});

test('equals Manhattan distance to nearest water on random grids', () => {
  for (let t = 0; t < 400; t++) {
    const m = ri(1, 8), n = ri(1, 8);
    const g = Array.from({ length: m }, () => Array.from({ length: n }, () => (Math.random() < 0.2 ? 1 : 0)));
    if (!g.flat().includes(1)) g[ri(0, m - 1)][ri(0, n - 1)] = 1;
    const out = highestPeak(g);
    assert.deepStrictEqual(out, brute(g));
    assert.ok(isValid(g, out));
  }
});

test('1000 x 1000 with a single water cell runs fast', () => {
  const g = Array.from({ length: 1000 }, () => new Array(1000).fill(0));
  g[0][0] = 1;
  const t0 = Date.now();
  const out = highestPeak(g);
  assert.strictEqual(out[999][999], 1998);
  assert.ok(Date.now() - t0 < 1000);
});
