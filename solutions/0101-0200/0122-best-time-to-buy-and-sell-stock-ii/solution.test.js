const test = require('node:test');
const assert = require('node:assert');
const { maxProfit } = require('./solution');

// Reference: exhaustive hold/not-hold search.
function brute(p) {
  const go = (i, holding) => {
    if (i === p.length) return 0;
    const wait = go(i + 1, holding);
    return holding ? Math.max(wait, p[i] + go(i + 1, false)) : Math.max(wait, -p[i] + go(i + 1, true));
  };
  return go(0, false);
}

test('official examples', () => {
  assert.strictEqual(maxProfit([7, 1, 5, 3, 6, 4]), 7);
  assert.strictEqual(maxProfit([1, 2, 3, 4, 5]), 4);
  assert.strictEqual(maxProfit([7, 6, 4, 3, 1]), 0);
});

test('matches exhaustive search', () => {
  for (let t = 0; t < 500; t++) {
    const p = Array.from({ length: 1 + Math.floor(Math.random() * 10) }, () => Math.floor(Math.random() * 10));
    assert.strictEqual(maxProfit(p), brute(p), JSON.stringify(p));
  }
});
