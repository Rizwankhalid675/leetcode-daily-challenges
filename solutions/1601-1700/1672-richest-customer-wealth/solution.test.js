const test = require('node:test');
const assert = require('node:assert');
const { maximumWealth } = require('./solution');

test('official examples', () => {
  assert.strictEqual(maximumWealth([[1, 2, 3], [3, 2, 1]]), 6);
  assert.strictEqual(maximumWealth([[1, 5], [7, 3], [3, 5]]), 10);
  assert.strictEqual(maximumWealth([[2, 8, 7], [7, 1, 3], [1, 9, 5]]), 17);
});

test('matches map/reduce on random grids', () => {
  for (let t = 0; t < 300; t++) {
    const m = 1 + Math.floor(Math.random() * 50), n = 1 + Math.floor(Math.random() * 50);
    const a = Array.from({ length: m }, () => Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 100)));
    assert.strictEqual(maximumWealth(a), Math.max(...a.map((r) => r.reduce((x, y) => x + y, 0))));
  }
});
