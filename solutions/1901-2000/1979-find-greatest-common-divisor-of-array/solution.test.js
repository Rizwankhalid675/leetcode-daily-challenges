const test = require('node:test');
const assert = require('node:assert');
const { findGCD } = require('./solution');

function bruteGcd(a, b) {
  for (let d = Math.min(a, b); d >= 1; d--) if (a % d === 0 && b % d === 0) return d;
  return 1;
}

test('official examples', () => {
  assert.strictEqual(findGCD([2, 5, 6, 9, 10]), 2);
  assert.strictEqual(findGCD([7, 5, 6, 8, 3]), 1);
  assert.strictEqual(findGCD([3, 3]), 3);
});

test('matches trial-division gcd on random arrays', () => {
  for (let t = 0; t < 1000; t++) {
    const n = 2 + Math.floor(Math.random() * 8);
    const a = Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 1000));
    assert.strictEqual(findGCD(a), bruteGcd(Math.min(...a), Math.max(...a)));
  }
});
