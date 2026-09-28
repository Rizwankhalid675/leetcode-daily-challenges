const test = require('node:test');
const assert = require('node:assert');
const { maxProfit } = require('./solution');

// Reference: exhaustive search over buy/sell/wait decisions each day.
function brute(prices, fee) {
  const go = (i, holding) => {
    if (i === prices.length) return 0;
    const wait = go(i + 1, holding);
    return holding ? Math.max(wait, prices[i] - fee + go(i + 1, false)) : Math.max(wait, -prices[i] + go(i + 1, true));
  };
  return go(0, false);
}

test('official examples', () => {
  assert.strictEqual(maxProfit([1, 3, 2, 8, 4, 9], 2), 8);
  assert.strictEqual(maxProfit([1, 3, 7, 5, 10, 3], 3), 6);
});

test('edge cases', () => {
  assert.strictEqual(maxProfit([5], 0), 0);
  assert.strictEqual(maxProfit([5, 4, 3], 0), 0); // never buy on a falling market
  assert.strictEqual(maxProfit([1, 2], 1), 0); // fee eats the whole gain
});

test('matches exhaustive search', () => {
  for (let t = 0; t < 500; t++) {
    const prices = Array.from({ length: 1 + Math.floor(Math.random() * 10) }, () => 1 + Math.floor(Math.random() * 10));
    const fee = Math.floor(Math.random() * 4);
    assert.strictEqual(maxProfit(prices, fee), brute(prices, fee), JSON.stringify([prices, fee]));
  }
});
