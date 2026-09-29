const test = require('node:test');
const assert = require('node:assert');
const { maxProfit } = require('./solution');

// Independent oracle: exhaustive recursion over (day, holding, transactions left).
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
  assert.strictEqual(maxProfit([3, 3, 5, 0, 0, 3, 1, 4]), 6);
  assert.strictEqual(maxProfit([1, 2, 3, 4, 5]), 4);
  assert.strictEqual(maxProfit([7, 6, 4, 3, 1]), 0);
});

test('single day', () => {
  assert.strictEqual(maxProfit([5]), 0);
});

test('matches exhaustive search with k = 2', () => {
  for (let t = 0; t < 1000; t++) {
    const a = Array.from({ length: 1 + Math.floor(Math.random() * 10) }, () => Math.floor(Math.random() * 10));
    assert.strictEqual(maxProfit(a), brute(a, 2));
  }
});

test('10^5 days is fast', () => {
  const a = Array.from({ length: 100000 }, () => Math.floor(Math.random() * 1e5));
  const t0 = Date.now();
  maxProfit(a);
  assert.ok(Date.now() - t0 < 500);
});
