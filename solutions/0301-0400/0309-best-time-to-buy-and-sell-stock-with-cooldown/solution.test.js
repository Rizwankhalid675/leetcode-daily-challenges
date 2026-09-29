const test = require('node:test');
const assert = require('node:assert');
const { maxProfit } = require('./solution');

const ri = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const rarr = (n, lo, hi) => Array.from({ length: n }, () => ri(lo, hi));
function brute(p) {
  // exhaustive: day i, whether holding, whether today is a cooldown
  const go = (i, holding, cool) => {
    if (i === p.length) return 0;
    let best = go(i + 1, holding, false);
    if (holding) best = Math.max(best, p[i] + go(i + 1, false, true));
    else if (!cool) best = Math.max(best, -p[i] + go(i + 1, true, false));
    return best;
  };
  return go(0, false, false);
}

test('official examples', () => {
  assert.strictEqual(maxProfit([1, 2, 3, 0, 2]), 3);
  assert.strictEqual(maxProfit([1]), 0);
});

test('matches exhaustive search', () => {
  for (let t = 0; t < 500; t++) {
    const p = rarr(ri(1, 11), 0, 10);
    assert.strictEqual(maxProfit(p), brute(p));
  }
});
