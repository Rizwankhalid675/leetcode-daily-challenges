const test = require('node:test');
const assert = require('node:assert');
const { isUgly } = require('./solution');

function brute(n) {
  if (n <= 0) return false;
  for (let d = 2; d <= n; d++) {
    if (n % d === 0) {
      let isPrime = true;
      for (let e = 2; e * e <= d; e++) if (d % e === 0) { isPrime = false; break; }
      if (isPrime && d !== 2 && d !== 3 && d !== 5) return false;
    }
  }
  return true;
}

test('official examples', () => {
  assert.strictEqual(isUgly(6), true);
  assert.strictEqual(isUgly(1), true);
  assert.strictEqual(isUgly(14), false);
});

test('edge cases', () => {
  assert.strictEqual(isUgly(0), false); // would loop forever without the guard
  assert.strictEqual(isUgly(-6), false);
  assert.strictEqual(isUgly(-2147483648), false);
  assert.strictEqual(isUgly(2147483647), false);
  assert.strictEqual(isUgly(1073741824), true); // 2^30
  assert.strictEqual(isUgly(1220703125), true); // 5^13
});

test('matches prime-factor brute force for -20..3000', () => {
  for (let n = -20; n <= 3000; n++) assert.strictEqual(isUgly(n), brute(n), 'n=' + n);
});
