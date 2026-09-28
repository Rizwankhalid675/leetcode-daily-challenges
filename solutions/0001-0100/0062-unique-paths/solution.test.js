const test = require('node:test');
const assert = require('node:assert');
const { uniquePaths } = require('./solution');

// Closed form: choose which (m-1) of the (m+n-2) moves go down. BigInt keeps it exact.
function binomial(m, n) {
  let r = 1n;
  const total = BigInt(m + n - 2);
  const k = BigInt(Math.min(m, n) - 1);
  for (let i = 1n; i <= k; i++) r = (r * (total - k + i)) / i;
  return Number(r);
}

test('official examples', () => {
  assert.strictEqual(uniquePaths(3, 7), 28);
  assert.strictEqual(uniquePaths(3, 2), 3);
});

test('matches the binomial formula wherever the answer is within the stated bound', () => {
  for (let m = 1; m <= 100; m++)
    for (let n = 1; n <= 100; n++) {
      const expected = binomial(m, n);
      if (expected > 2e9) continue; // outside the problem's guarantee
      assert.strictEqual(uniquePaths(m, n), expected, `m=${m} n=${n}`);
    }
});
