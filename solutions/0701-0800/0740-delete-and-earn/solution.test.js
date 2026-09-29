const test = require('node:test');
const assert = require('node:assert');
const { deleteAndEarn } = require('./solution');

const ri = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const rarr = (n, lo, hi) => Array.from({ length: n }, () => ri(lo, hi));
// Plays the literal game on the multiset (memoized on the sorted remainder).
function game(nums) {
  const memo = new Map();
  const go = (arr) => {
    if (arr.length === 0) return 0;
    const key = arr.join(',');
    if (memo.has(key)) return memo.get(key);
    let best = 0;
    for (let i = 0; i < arr.length; i++) {
      const x = arr[i];
      const rest = arr.filter((y, j) => j !== i && y !== x - 1 && y !== x + 1);
      best = Math.max(best, x + go(rest));
    }
    memo.set(key, best);
    return best;
  };
  return go([...nums].sort((a, b) => a - b));
}

test('official examples', () => {
  assert.strictEqual(deleteAndEarn([3, 4, 2]), 6);
  assert.strictEqual(deleteAndEarn([2, 2, 3, 3, 3, 4]), 9);
});

test('matches a literal game simulation on small inputs', () => {
  for (let t = 0; t < 400; t++) {
    const a = rarr(ri(1, 8), 1, 7);
    assert.strictEqual(deleteAndEarn(a), game(a));
  }
});

test('max size runs fast', () => {
  const a = rarr(20000, 1, 10000);
  const t0 = Date.now();
  deleteAndEarn(a);
  assert.ok(Date.now() - t0 < 1000);
});
