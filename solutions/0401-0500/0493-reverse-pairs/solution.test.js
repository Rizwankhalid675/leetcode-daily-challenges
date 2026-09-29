const test = require('node:test');
const assert = require('node:assert');
const { reversePairs } = require('./solution');

function brute(a) {
  let c = 0;
  for (let i = 0; i < a.length; i++) for (let j = i + 1; j < a.length; j++) if (a[i] > 2 * a[j]) c++;
  return c;
}

test('official examples', () => {
  assert.strictEqual(reversePairs([1, 3, 2, 3, 1]), 2);
  assert.strictEqual(reversePairs([2, 4, 3, 5, 1]), 3);
});

test('extreme 32-bit values (no overflow in 2 * x)', () => {
  assert.strictEqual(reversePairs([2147483647, 2147483647, 2147483647]), 0);
  assert.strictEqual(reversePairs([2147483647, -2147483648]), 1);
  assert.strictEqual(reversePairs([-2147483648, -2147483648]), 1); // -2^31 > -2^32
  assert.strictEqual(reversePairs([1]), 0);
});

test('matches brute force', () => {
  for (let t = 0; t < 1000; t++) {
    const a = Array.from({ length: 1 + Math.floor(Math.random() * 20) }, () => Math.floor(Math.random() * 21) - 10);
    assert.strictEqual(reversePairs(a), brute(a));
  }
});

test('max size 5e4 full-range random runs fast', () => {
  const n = 5e4;
  const a = Array.from({ length: n }, () => Math.floor(Math.random() * 4294967296) - 2147483648);
  const t0 = Date.now();
  const got = reversePairs(a);
  assert.ok(Date.now() - t0 < 1000);
  // cross-check on a prefix small enough for brute force
  const small = a.slice(0, 2000);
  assert.strictEqual(reversePairs(small), brute(small));
  assert.ok(got >= 0);
});
