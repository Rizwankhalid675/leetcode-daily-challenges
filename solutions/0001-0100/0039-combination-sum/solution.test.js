const test = require('node:test');
const assert = require('node:assert');
const { combinationSum } = require('./solution');

const key = (res) => res.map((c) => [...c].sort((a, b) => a - b).join(',')).sort();

// Independent count: number of multisets summing to target (coin-change "ways" DP).
function ways(cands, target) {
  const dp = new Array(target + 1).fill(0);
  dp[0] = 1;
  for (const c of cands) for (let s = c; s <= target; s++) dp[s] += dp[s - c];
  return dp[target];
}

test('official examples', () => {
  assert.deepStrictEqual(key(combinationSum([2, 3, 6, 7], 7)), key([[2, 2, 3], [7]]));
  assert.deepStrictEqual(key(combinationSum([2, 3, 5], 8)), key([[2, 2, 2, 2], [2, 3, 3], [3, 5]]));
  assert.deepStrictEqual(combinationSum([2], 1), []);
});

test('random: every result is valid, unique, and the count matches the DP', () => {
  for (let t = 0; t < 300; t++) {
    const set = new Set();
    const k = 1 + Math.floor(Math.random() * 5);
    while (set.size < k) set.add(2 + Math.floor(Math.random() * 12));
    const cands = [...set];
    const target = 1 + Math.floor(Math.random() * 25);
    const res = combinationSum(cands, target);
    for (const c of res) {
      assert.strictEqual(c.reduce((a, b) => a + b, 0), target);
      for (const v of c) assert.ok(set.has(v));
    }
    assert.strictEqual(new Set(key(res)).size, res.length);
    assert.strictEqual(res.length, ways(cands, target));
  }
});
