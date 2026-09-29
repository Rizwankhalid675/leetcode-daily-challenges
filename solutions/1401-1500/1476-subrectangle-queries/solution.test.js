const test = require('node:test');
const assert = require('node:assert');
const { SubrectangleQueries } = require('./solution');

test('official example 1', () => {
  const q = new SubrectangleQueries([[1, 2, 1], [4, 3, 4], [3, 2, 1], [1, 1, 1]]);
  assert.strictEqual(q.getValue(0, 2), 1);
  q.updateSubrectangle(0, 0, 3, 2, 5);
  assert.strictEqual(q.getValue(0, 2), 5);
  assert.strictEqual(q.getValue(3, 1), 5);
  q.updateSubrectangle(3, 0, 3, 2, 10);
  assert.strictEqual(q.getValue(3, 1), 10);
  assert.strictEqual(q.getValue(0, 2), 5);
});

test('official example 2', () => {
  const q = new SubrectangleQueries([[1, 1, 1], [2, 2, 2], [3, 3, 3]]);
  assert.strictEqual(q.getValue(0, 0), 1);
  q.updateSubrectangle(0, 0, 2, 2, 100);
  assert.strictEqual(q.getValue(0, 0), 100);
  assert.strictEqual(q.getValue(2, 2), 100);
  q.updateSubrectangle(1, 1, 2, 2, 20);
  assert.strictEqual(q.getValue(2, 2), 20);
});

test('matches painting a copied grid', () => {
  for (let t = 0; t < 200; t++) {
    const rows = 1 + Math.floor(Math.random() * 5);
    const cols = 1 + Math.floor(Math.random() * 5);
    const grid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => 1 + Math.floor(Math.random() * 9)));
    const q = new SubrectangleQueries(grid.map((r) => [...r]));
    for (let op = 0; op < 40; op++) {
      if (Math.random() < 0.4) {
        const r1 = Math.floor(Math.random() * rows), r2 = r1 + Math.floor(Math.random() * (rows - r1));
        const c1 = Math.floor(Math.random() * cols), c2 = c1 + Math.floor(Math.random() * (cols - c1));
        const v = 1 + Math.floor(Math.random() * 100);
        q.updateSubrectangle(r1, c1, r2, c2, v);
        for (let r = r1; r <= r2; r++) for (let c = c1; c <= c2; c++) grid[r][c] = v;
      } else {
        const r = Math.floor(Math.random() * rows), c = Math.floor(Math.random() * cols);
        assert.strictEqual(q.getValue(r, c), grid[r][c]);
      }
    }
  }
});
