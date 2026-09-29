const test = require('node:test');
const assert = require('node:assert');
const { smallestRepunitDivByK } = require('./solution');

function brute(k) {
  // BigInt repunits, up to length k (the proven bound)
  let v = 0n;
  const K = BigInt(k);
  for (let len = 1; len <= k; len++) {
    v = v * 10n + 1n;
    if (v % K === 0n) return len;
  }
  return -1;
}

test('official examples', () => {
  assert.strictEqual(smallestRepunitDivByK(1), 1);
  assert.strictEqual(smallestRepunitDivByK(2), -1);
  assert.strictEqual(smallestRepunitDivByK(3), 3);
});

test('hand-checked values', () => {
  assert.strictEqual(smallestRepunitDivByK(7), 6); // 111111 = 7 * 15873
  assert.strictEqual(smallestRepunitDivByK(11), 2);
  assert.strictEqual(smallestRepunitDivByK(25), -1);
  assert.strictEqual(smallestRepunitDivByK(41), 5); // 11111 = 41 * 271
});

test('matches BigInt repunits for k in 1..300', () => {
  for (let k = 1; k <= 300; k++) assert.strictEqual(smallestRepunitDivByK(k), brute(k), 'k=' + k);
});

test('max k runs fast', () => {
  const t0 = Date.now();
  for (let k = 99900; k <= 100000; k++) smallestRepunitDivByK(k);
  assert.ok(Date.now() - t0 < 1000);
});
