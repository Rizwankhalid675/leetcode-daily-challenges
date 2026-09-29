const test = require('node:test');
const assert = require('node:assert');
const { maximumPrimeDifference } = require('./solution');

function prime(x) {
  if (x < 2) return false;
  for (let d = 2; d < x; d++) if (x % d === 0) return false;
  return true;
}
function brute(nums) {
  let best = 0;
  for (let i = 0; i < nums.length; i++)
    for (let j = i; j < nums.length; j++) if (prime(nums[i]) && prime(nums[j])) best = Math.max(best, j - i);
  return best;
}

test('official examples', () => {
  assert.strictEqual(maximumPrimeDifference([4, 2, 9, 5, 3]), 3);
  assert.strictEqual(maximumPrimeDifference([4, 8, 2, 8]), 0);
});

test('1 is not prime; 2 and 97 are', () => {
  assert.strictEqual(maximumPrimeDifference([2, 1, 1, 97]), 3);
  assert.strictEqual(maximumPrimeDifference([1, 1, 2, 1]), 0);
});

test('matches all-pairs scan on random arrays', () => {
  for (let t = 0; t < 1000; t++) {
    const n = 1 + Math.floor(Math.random() * 12);
    const a = Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 100));
    if (!a.some(prime)) a[Math.floor(Math.random() * n)] = 2;
    assert.strictEqual(maximumPrimeDifference(a), brute(a), JSON.stringify(a));
  }
});
