const test = require('node:test');
const assert = require('node:assert');
const { countSubarrays } = require('./solution');

function brute(nums, k) {
  let c = 0;
  for (let i = 0; i < nums.length; i++) for (let j = i; j < nums.length; j++) {
    const s = nums.slice(i, j + 1).sort((a, b) => a - b);
    if (s[(s.length - 1) >> 1] === k) c++;
  }
  return c;
}
function perm(n) {
  const a = Array.from({ length: n }, (_, i) => i + 1);
  for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

test('official examples', () => {
  assert.strictEqual(countSubarrays([3, 2, 1, 4, 5], 4), 3);
  assert.strictEqual(countSubarrays([2, 3, 1], 3), 1);
});

test('single element and k at the ends', () => {
  assert.strictEqual(countSubarrays([1], 1), 1);
  assert.strictEqual(countSubarrays([1, 2, 3], 1), 2); // [1], [1,2]
  assert.strictEqual(countSubarrays([1, 2, 3], 3), 1);
});

test('matches brute force on random permutations', () => {
  for (let t = 0; t < 1000; t++) {
    const n = 1 + Math.floor(Math.random() * 10);
    const nums = perm(n);
    const k = 1 + Math.floor(Math.random() * n);
    assert.strictEqual(countSubarrays(nums, k), brute(nums, k));
  }
});

test('max size runs fast', () => {
  const n = 1e5;
  const nums = Array.from({ length: n }, (_, i) => i + 1);
  const t0 = Date.now();
  // sorted array, k in the middle: subarrays [i..j] containing k with balanced sides
  const r = countSubarrays(nums, 50000);
  assert.ok(r > 0);
  countSubarrays(perm(n), 1);
  assert.ok(Date.now() - t0 < 500);
});
