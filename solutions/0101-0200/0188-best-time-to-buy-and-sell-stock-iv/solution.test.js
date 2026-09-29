const test = require('node:test');
const assert = require('node:assert');
const { maxProfit } = require('./solution');

function brute(prices, k) {
  const go = (i, holding, left) => {
    if (i === prices.length) return 0;
    let best = go(i + 1, holding, left);
    if (holding) best = Math.max(best, prices[i] + go(i + 1, false, left));
    else if (left > 0) best = Math.max(best, -prices[i] + go(i + 1, true, left - 1));
    return best;
  };
  return go(0, false, k);
}

test('official examples', () => {
  assert.strictEqual(maxProfit(2, [2, 4, 1]), 2);
  assert.strictEqual(maxProfit(2, [3, 2, 6, 5, 0, 3]), 7);
});

test('k = 1 and large k', () => {
  assert.strictEqual(maxProfit(1, [3, 2, 6, 5, 0, 3]), 4);
  assert.strictEqual(maxProfit(100, [1]), 0);
  assert.strictEqual(maxProfit(100, [1, 5, 2, 8, 3, 9]), 16);
});

test('matches exhaustive search for random k', () => {
  for (let t = 0; t < 1000; t++) {
    const a = Array.from({ length: 1 + Math.floor(Math.random() * 10) }, () => Math.floor(Math.random() * 10));
    const k = 1 + Math.floor(Math.random() * 5);
    assert.strictEqual(maxProfit(k, a), brute(a, k));
  }
});

test('k = 100, 1000 days is fast', () => {
  const a = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1001));
  const t0 = Date.now();
  maxProfit(100, a);
  assert.ok(Date.now() - t0 < 500);
});
