const test = require('node:test');
const assert = require('node:assert');
const { majorityElement } = require('./solution');

test('official examples', () => {
  assert.strictEqual(majorityElement([3, 2, 3]), 3);
  assert.strictEqual(majorityElement([2, 2, 1, 1, 1, 2, 2]), 2);
});

test('random arrays with a guaranteed majority, in shuffled order', () => {
  for (let t = 0; t < 1000; t++) {
    const n = 1 + Math.floor(Math.random() * 15);
    const major = Math.floor(Math.random() * 5);
    const count = Math.floor(n / 2) + 1;
    const others = Array.from({ length: n - count }, () => Math.floor(Math.random() * 5)).map((v) => (v === major ? major + 1 : v));
    const arr = [...Array(count).fill(major), ...others].sort(() => Math.random() - 0.5);
    assert.strictEqual(majorityElement(arr), major, JSON.stringify(arr));
  }
});
