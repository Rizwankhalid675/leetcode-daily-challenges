const test = require('node:test');
const assert = require('node:assert');
const { maxSlidingWindow } = require('./solution');

function brute(nums, k) {
  const out = [];
  for (let i = 0; i + k <= nums.length; i++) out.push(Math.max(...nums.slice(i, i + k)));
  return out;
}

test('official examples', () => {
  assert.deepStrictEqual(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3), [3, 3, 5, 5, 6, 7]);
  assert.deepStrictEqual(maxSlidingWindow([1], 1), [1]);
});

test('k = 1 and k = n', () => {
  assert.deepStrictEqual(maxSlidingWindow([4, -2, 7], 1), [4, -2, 7]);
  assert.deepStrictEqual(maxSlidingWindow([4, -2, 7], 3), [7]);
});

test('matches brute force', () => {
  for (let t = 0; t < 1000; t++) {
    const nums = Array.from({ length: 1 + Math.floor(Math.random() * 15) }, () => Math.floor(Math.random() * 11) - 5);
    const k = 1 + Math.floor(Math.random() * nums.length);
    assert.deepStrictEqual(maxSlidingWindow(nums, k), brute(nums, k));
  }
});

test('max size (decreasing and increasing) runs fast', () => {
  const dec = Array.from({ length: 1e5 }, (_, i) => 10000 - (i % 20001));
  const inc = Array.from({ length: 1e5 }, (_, i) => (i % 20001) - 10000);
  const t0 = Date.now();
  maxSlidingWindow(dec, 50000);
  maxSlidingWindow(inc, 3);
  assert.ok(Date.now() - t0 < 500);
});
