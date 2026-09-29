const test = require('node:test');
const assert = require('node:assert');
const { searchInsert } = require('./solution');

test('official examples', () => {
  assert.strictEqual(searchInsert([1, 3, 5, 6], 5), 2);
  assert.strictEqual(searchInsert([1, 3, 5, 6], 2), 1);
  assert.strictEqual(searchInsert([1, 3, 5, 6], 7), 4);
});

test('before the first element', () => {
  assert.strictEqual(searchInsert([1, 3, 5, 6], 0), 0);
  assert.strictEqual(searchInsert([1], 1), 0);
});

test('matches linear scan', () => {
  for (let t = 0; t < 1000; t++) {
    const set = new Set(Array.from({ length: 1 + Math.floor(Math.random() * 10) }, () => Math.floor(Math.random() * 30) - 15));
    const a = [...set].sort((x, y) => x - y);
    const target = Math.floor(Math.random() * 34) - 17;
    let want = a.findIndex((v) => v >= target);
    if (want === -1) want = a.length;
    assert.strictEqual(searchInsert(a, target), want);
  }
});
