const test = require('node:test');
const assert = require('node:assert');
const { search } = require('./solution');

test('official examples', () => {
  assert.strictEqual(search([-1, 0, 3, 5, 9, 12], 9), 4);
  assert.strictEqual(search([-1, 0, 3, 5, 9, 12], 2), -1);
});

test('edge cases', () => {
  assert.strictEqual(search([5], 5), 0);
  assert.strictEqual(search([5], -5), -1);
  assert.strictEqual(search([1, 2], 3), -1);
  assert.strictEqual(search([1, 2], 0), -1);
});

test('matches indexOf on random sorted arrays', () => {
  for (let t = 0; t < 1000; t++) {
    const s = new Set();
    const n = 1 + Math.floor(Math.random() * 12);
    while (s.size < n) s.add(Math.floor(Math.random() * 40) - 20);
    const a = [...s].sort((x, y) => x - y);
    const target = Math.floor(Math.random() * 44) - 22;
    assert.strictEqual(search(a, target), a.indexOf(target));
  }
});
