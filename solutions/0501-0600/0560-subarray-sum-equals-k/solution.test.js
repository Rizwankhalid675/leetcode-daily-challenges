const test = require('node:test');
const assert = require('node:assert');
const { subarraySum } = require('./solution');

function bruteForce(nums, k) {
  let c = 0;
  for (let i = 0; i < nums.length; i++) {
    let s = 0;
    for (let j = i; j < nums.length; j++) { s += nums[j]; if (s === k) c++; }
  }
  return c;
}

test('official examples', () => {
  assert.strictEqual(subarraySum([1, 1, 1], 2), 2);
  assert.strictEqual(subarraySum([1, 2, 3], 3), 2);
});

test('edge cases', () => {
  assert.strictEqual(subarraySum([0, 0, 0], 0), 6);
  assert.strictEqual(subarraySum([1, -1, 0], 0), 3);
  assert.strictEqual(subarraySum([5], 4), 0);
  assert.strictEqual(subarraySum([-1, -1, 1], 0), 1);
});

test('matches brute force on random arrays with negatives', () => {
  for (let t = 0; t < 2000; t++) {
    const nums = Array.from({ length: 1 + Math.floor(Math.random() * 10) }, () => Math.floor(Math.random() * 7) - 3);
    const k = Math.floor(Math.random() * 9) - 4;
    assert.strictEqual(subarraySum(nums, k), bruteForce(nums, k));
  }
});

test('2e4 elements finish quickly', () => {
  const nums = Array.from({ length: 20000 }, () => Math.floor(Math.random() * 2001) - 1000);
  const t0 = Date.now();
  subarraySum(nums, 0);
  assert.ok(Date.now() - t0 < 1000);
});
