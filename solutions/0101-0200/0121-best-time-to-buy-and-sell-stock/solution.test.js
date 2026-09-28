const test = require('node:test');
const assert = require('node:assert');
const { maxProfit } = require('./solution');

function brute(p) {
  let best = 0;
  for (let i = 0; i < p.length; i++) for (let j = i + 1; j < p.length; j++) best = Math.max(best, p[j] - p[i]);
  return best;
}

test('official examples', () => {
  assert.strictEqual(maxProfit([7, 1, 5, 3, 6, 4]), 5);
  assert.strictEqual(maxProfit([7, 6, 4, 3, 1]), 0);
});

test('matches all-pairs brute force', () => {
  assert.strictEqual(maxProfit([5]), 0);
  for (let t = 0; t < 1000; t++) {
    const p = Array.from({ length: 1 + Math.floor(Math.random() * 12) }, () => Math.floor(Math.random() * 20));
    assert.strictEqual(maxProfit(p), brute(p), JSON.stringify(p));
  }
});
