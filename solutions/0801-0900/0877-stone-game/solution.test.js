const test = require('node:test');
const assert = require('node:assert');
const { stoneGame } = require('./solution');

// Oracle: interval DP. diff[i][j] = best (mover - other) score on piles[i..j].
function dpWins(piles) {
  const n = piles.length;
  const diff = Array.from({ length: n }, (_, i) => {
    const row = new Array(n).fill(0);
    row[i] = piles[i];
    return row;
  });
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i + len - 1 < n; i++) {
      const j = i + len - 1;
      diff[i][j] = Math.max(piles[i] - diff[i + 1][j], piles[j] - diff[i][j - 1]);
    }
  }
  return diff[0][n - 1] > 0;
}

test('official examples', () => {
  assert.strictEqual(stoneGame([5, 3, 4, 5]), true);
  assert.strictEqual(stoneGame([3, 7, 2, 3]), true);
});

test('agrees with the interval DP on random valid inputs', () => {
  for (let t = 0; t < 2000; t++) {
    const n = 2 * (1 + Math.floor(Math.random() * 6));
    const piles = Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 20));
    const sum = piles.reduce((a, b) => a + b, 0);
    if (sum % 2 === 0) piles[0]++; // input guarantees an odd total
    assert.strictEqual(dpWins(piles), true, JSON.stringify(piles));
    assert.strictEqual(stoneGame(piles), dpWins(piles));
  }
});
