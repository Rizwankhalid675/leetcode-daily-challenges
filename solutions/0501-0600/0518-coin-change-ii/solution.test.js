const test = require('node:test');
const assert = require('node:assert');
const { change } = require('./solution');

const ri = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const rarr = (n, lo, hi) => Array.from({ length: n }, () => ri(lo, hi));
function brute(amount, coins) {
  const go = (i, rem) => {
    if (rem === 0) return 1;
    if (i === coins.length) return 0;
    let ways = 0;
    for (let k = 0; k * coins[i] <= rem; k++) ways += go(i + 1, rem - k * coins[i]);
    return ways;
  };
  return go(0, amount);
}
function exact(amount, coins) {
  const dp = new Array(amount + 1).fill(0n);
  dp[0] = 1n;
  for (const c of coins) for (let a = c; a <= amount; a++) dp[a] += dp[a - c];
  return dp[amount];
}
function distinct(k, lo, hi) {
  const s = new Set();
  while (s.size < k) s.add(ri(lo, hi));
  return [...s];
}

test('official examples', () => {
  assert.strictEqual(change(5, [1, 2, 5]), 4);
  assert.strictEqual(change(3, [2]), 0);
  assert.strictEqual(change(10, [10]), 1);
});

test('amount 0 has exactly one (empty) combination', () => {
  assert.strictEqual(change(0, [7]), 1);
});

test('matches explicit enumeration', () => {
  for (let t = 0; t < 400; t++) {
    const coins = distinct(ri(1, 4), 1, 8);
    const amount = ri(0, 25);
    assert.strictEqual(change(amount, coins), brute(amount, coins));
  }
});

test('stays exact when intermediate counts exceed 2^53 but the answer fits 32 bits', () => {
  // Even coins make huge counts for even amounts; the odd target is only reachable by the single 4999 coin.
  const coins = Array.from({ length: 100 }, (_, i) => 2 * (i + 1)).concat([4999]);
  assert.ok(exact(4000, coins) > 2n ** 53n);
  assert.strictEqual(change(4999, coins), 1);
  // Random large cases, compared with BigInt whenever the true answer fits in 32 bits.
  let checked = 0;
  for (let t = 0; t < 25; t++) {
    const coins2 = distinct(ri(1, 40), 50, 5000);
    const amount = ri(0, 5000);
    const want = exact(amount, coins2);
    if (want > 2147483647n) continue;
    checked++;
    assert.strictEqual(change(amount, coins2), Number(want));
  }
  assert.ok(checked > 0);
});
