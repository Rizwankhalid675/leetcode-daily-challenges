const test = require('node:test');
const assert = require('node:assert');
const { orangesRotting } = require('./solution');

// Reference: literal minute-by-minute simulation.
function simulate(grid) {
  let g = grid.map((r) => [...r]);
  for (let minute = 0; ; minute++) {
    if (!g.some((r) => r.includes(1))) return minute;
    const next = g.map((r) => [...r]);
    let changed = false;
    g.forEach((row, r) =>
      row.forEach((v, c) => {
        if (v !== 1) return;
        if ([[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dr, dc]) => g[r + dr]?.[c + dc] === 2)) (next[r][c] = 2), (changed = true);
      }),
    );
    if (!changed) return -1;
    g = next;
  }
}

test('official examples', () => {
  assert.strictEqual(orangesRotting([[2, 1, 1], [1, 1, 0], [0, 1, 1]]), 4);
  assert.strictEqual(orangesRotting([[2, 1, 1], [0, 1, 1], [1, 0, 1]]), -1);
  assert.strictEqual(orangesRotting([[0, 2]]), 0);
});

test('edge cases', () => {
  assert.strictEqual(orangesRotting([[0]]), 0); // no oranges at all
  assert.strictEqual(orangesRotting([[1]]), -1); // fresh with no rotten source
  assert.strictEqual(orangesRotting([[2, 1, 1, 1, 2]]), 2); // two sources meet in the middle
});

test('matches minute-by-minute simulation', () => {
  for (let t = 0; t < 500; t++) {
    const m = 1 + Math.floor(Math.random() * 5), n = 1 + Math.floor(Math.random() * 5);
    const g = Array.from({ length: m }, () => Array.from({ length: n }, () => Math.floor(Math.random() * 3)));
    assert.strictEqual(orangesRotting(g), simulate(g), JSON.stringify(g));
  }
});
