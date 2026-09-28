const test = require('node:test');
const assert = require('node:assert');
const { minCostClimbingStairs } = require('./solution');

// Reference: explicit recursion over all climbing choices (tiny inputs).
function brute(cost) {
  const n = cost.length;
  const go = (i) => (i >= n ? 0 : cost[i] + Math.min(go(i + 1), go(i + 2)));
  return Math.min(go(0), go(1));
}

test('official examples', () => {
  assert.strictEqual(minCostClimbingStairs([10, 15, 20]), 15);
  assert.strictEqual(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]), 6);
});

test('edge cases', () => {
  assert.strictEqual(minCostClimbingStairs([0, 0]), 0);
  assert.strictEqual(minCostClimbingStairs([5, 3]), 3); // start at step 1, jump to top
});

test('matches recursive enumeration', () => {
  for (let t = 0; t < 500; t++) {
    const cost = Array.from({ length: 2 + Math.floor(Math.random() * 12) }, () => Math.floor(Math.random() * 20));
    assert.strictEqual(minCostClimbingStairs(cost), brute(cost), JSON.stringify(cost));
  }
});
