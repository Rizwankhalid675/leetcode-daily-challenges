const test = require('node:test');
const assert = require('node:assert');
const { search } = require('./solution');

test('official examples', () => {
  assert.strictEqual(search([4, 5, 6, 7, 0, 1, 2], 0), 4);
  assert.strictEqual(search([4, 5, 6, 7, 0, 1, 2], 3), -1);
  assert.strictEqual(search([1], 0), -1);
});

test('edge cases', () => {
  assert.strictEqual(search([1], 1), 0);
  assert.strictEqual(search([3, 1], 1), 1);
  assert.strictEqual(search([3, 1], 3), 0);
  assert.strictEqual(search([1, 3], 3), 1);
});

test('matches indexOf on every rotation', () => {
  for (let t = 0; t < 300; t++) {
    const s = new Set();
    const n = 1 + Math.floor(Math.random() * 10);
    while (s.size < n) s.add(Math.floor(Math.random() * 30) - 10);
    const sorted = [...s].sort((x, y) => x - y);
    for (let r = 0; r < n; r++) {
      const a = [...sorted.slice(r), ...sorted.slice(0, r)];
      for (let target = -12; target <= 21; target++) assert.strictEqual(search(a, target), a.indexOf(target));
    }
  }
});
