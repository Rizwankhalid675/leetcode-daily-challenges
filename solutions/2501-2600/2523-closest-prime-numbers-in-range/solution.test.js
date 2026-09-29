const test = require('node:test');
const assert = require('node:assert');
const { closestPrimes } = require('./solution');

const rint = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));

function brute(left, right) {
  const isPrime = (x) => { if (x < 2) return false; for (let d = 2; d * d <= x; d++) if (x % d === 0) return false; return true; };
  const ps = [];
  for (let x = left; x <= right; x++) if (isPrime(x)) ps.push(x);
  let best = [-1, -1];
  for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) {
    const g = ps[j] - ps[i];
    if (best[0] === -1 || g < best[1] - best[0]) best = [ps[i], ps[j]];
  }
  return best;
}

test('official examples', () => {
  assert.deepStrictEqual(closestPrimes(10, 19), [11, 13]);
  assert.deepStrictEqual(closestPrimes(4, 6), [-1, -1]);
});

test('edge cases', () => {
  assert.deepStrictEqual(closestPrimes(1, 1), [-1, -1]);
  assert.deepStrictEqual(closestPrimes(1, 2), [-1, -1]);
  assert.deepStrictEqual(closestPrimes(1, 3), [2, 3]);
  assert.deepStrictEqual(closestPrimes(3, 7), [3, 5]);
  assert.deepStrictEqual(closestPrimes(24, 30), [-1, -1]);
  assert.deepStrictEqual(closestPrimes(19, 31), [29, 31]);
});

test('matches all-pairs brute force', () => {
  for (let t = 0; t < 1500; t++) {
    const left = rint(1, 300);
    const right = left + rint(0, 60);
    assert.deepStrictEqual(closestPrimes(left, right), brute(left, right), left + ',' + right);
  }
});

test('max range runs fast', () => {
  const t0 = Date.now();
  assert.deepStrictEqual(closestPrimes(999900, 1000000), brute(999900, 1000000));
  closestPrimes(1, 1000000);
  assert.ok(Date.now() - t0 < 1000);
});
