const test = require('node:test');
const assert = require('node:assert');
const { findMin } = require('./solution');

test('official examples', () => {
  assert.strictEqual(findMin([3, 4, 5, 1, 2]), 1);
  assert.strictEqual(findMin([4, 5, 6, 7, 0, 1, 2]), 0);
  assert.strictEqual(findMin([11, 13, 15, 17]), 11);
});

test('every rotation of random sorted arrays', () => {
  for (let t = 0; t < 200; t++) {
    const set = new Set(Array.from({ length: 1 + Math.floor(Math.random() * 12) }, () => Math.floor(Math.random() * 100) - 50));
    const a = [...set].sort((x, y) => x - y);
    for (let k = 0; k < a.length; k++) {
      const rot = a.slice(k).concat(a.slice(0, k));
      assert.strictEqual(findMin(rot), a[0]);
    }
  }
});
