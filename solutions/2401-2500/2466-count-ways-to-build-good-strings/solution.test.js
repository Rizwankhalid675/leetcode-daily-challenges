const test = require('node:test');
const assert = require('node:assert');
const { countGoodStrings } = require('./solution');

const ri = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const rarr = (n, lo, hi) => Array.from({ length: n }, () => ri(lo, hi));
function brute(low, high, zero, one) {
  const seen = new Set();
  const go = (s) => {
    if (s.length > high) return;
    if (s.length >= low) seen.add(s);
    go(s + '0'.repeat(zero));
    go(s + '1'.repeat(one));
  };
  go('');
  return seen.size;
}

test('official examples', () => {
  assert.strictEqual(countGoodStrings(3, 3, 1, 1), 8);
  assert.strictEqual(countGoodStrings(2, 3, 1, 2), 5);
});

test('matches a set of generated strings', () => {
  for (let t = 0; t < 300; t++) {
    const high = ri(1, 13), low = ri(1, high);
    const zero = ri(1, low), one = ri(1, low);
    assert.strictEqual(countGoodStrings(low, high, zero, one), brute(low, high, zero, one));
  }
});

test('max size stays in range and runs fast', () => {
  const t0 = Date.now();
  const r = countGoodStrings(1, 100000, 1, 1);
  assert.ok(Date.now() - t0 < 1000);
  // Sum of 2^len for len = 1..1e5 = 2^(1e5+1) - 2 (mod p), computed with BigInt.
  const p = 1000000007n;
  let pow = 1n, b = 2n, e = 100001n;
  while (e > 0n) { if (e & 1n) pow = (pow * b) % p; b = (b * b) % p; e >>= 1n; }
  assert.strictEqual(r, Number((pow - 2n + p) % p));
});
