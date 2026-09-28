const test = require('node:test');
const assert = require('node:assert');
const { StockSpanner } = require('./solution');

test('official example', () => {
  const s = new StockSpanner();
  assert.deepStrictEqual([100, 80, 60, 70, 60, 75, 85].map((p) => s.next(p)), [1, 1, 1, 2, 1, 4, 6]);
});

test('matches a backward-scan reference', () => {
  for (let run = 0; run < 200; run++) {
    const s = new StockSpanner();
    const prices = [];
    for (let i = 0; i < 50; i++) {
      const p = 1 + Math.floor(Math.random() * 10);
      prices.push(p);
      let span = 0;
      for (let j = prices.length - 1; j >= 0 && prices[j] <= p; j--) span++;
      assert.strictEqual(s.next(p), span);
    }
  }
});
