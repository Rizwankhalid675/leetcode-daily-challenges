const test = require('node:test');
const assert = require('node:assert');
const { countCommas } = require('./solution');
const { countCommas: linear } = require('../08-3870-count-commas-in-range/solution');

test('official examples', () => {
  assert.strictEqual(countCommas(1002), 3);
  assert.strictEqual(countCommas(998), 0);
});

test('agrees with the linear Part I solution', () => {
  for (const n of [1, 999, 1000, 1001, 54321, 99999, 100000]) assert.strictEqual(countCommas(n), linear(n), String(n));
  for (let t = 0; t < 200; t++) {
    const n = 1 + Math.floor(Math.random() * 100000);
    assert.strictEqual(countCommas(n), linear(n), String(n));
  }
});

test('large n is exact (checked with BigInt)', () => {
  const big = (n) => {
    let total = 0n;
    for (let t = 1000n; t <= n; t *= 1000n) total += n - t + 1n;
    return total;
  };
  for (const n of [1e6, 1e9, 999999999999999, 1e15]) {
    assert.strictEqual(BigInt(countCommas(n)), big(BigInt(n)), String(n));
  }
  // n = 1e15: thresholds 1e3, 1e6, 1e9, 1e12, 1e15 all apply
  assert.strictEqual(countCommas(1e15), 5e15 - 1001001001001000 + 5);
});
