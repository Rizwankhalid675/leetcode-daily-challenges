const test = require('node:test');
const assert = require('node:assert');
const { bagOfTokensScore } = require('./solution');

// Oracle: exhaustive search over every play order (tokens are few).
function brute(tokens, power) {
  const n = tokens.length;
  let best = 0;
  const go = (used, p, s) => {
    best = Math.max(best, s);
    for (let i = 0; i < n; i++) {
      if (used & (1 << i)) continue;
      if (p >= tokens[i]) go(used | (1 << i), p - tokens[i], s + 1);
      if (s >= 1) go(used | (1 << i), p + tokens[i], s - 1);
    }
  };
  go(0, power, 0);
  return best;
}

test('official examples', () => {
  assert.strictEqual(bagOfTokensScore([100], 50), 0);
  assert.strictEqual(bagOfTokensScore([200, 100], 150), 1);
  assert.strictEqual(bagOfTokensScore([100, 200, 300, 400], 200), 2);
});

test('edge cases', () => {
  assert.strictEqual(bagOfTokensScore([], 85), 0);
  assert.strictEqual(bagOfTokensScore([0, 0], 0), 2);
  assert.strictEqual(bagOfTokensScore([71, 55, 82], 54), 0);
});

test('input array is not mutated', () => {
  const a = [3, 1, 2];
  bagOfTokensScore(a, 5);
  assert.deepStrictEqual(a, [3, 1, 2]);
});

test('matches exhaustive search on random inputs', () => {
  for (let t = 0; t < 400; t++) {
    const n = Math.floor(Math.random() * 7);
    const tokens = Array.from({ length: n }, () => Math.floor(Math.random() * 20));
    const power = Math.floor(Math.random() * 25);
    assert.strictEqual(bagOfTokensScore(tokens, power), brute(tokens, power), JSON.stringify([tokens, power]));
  }
});
