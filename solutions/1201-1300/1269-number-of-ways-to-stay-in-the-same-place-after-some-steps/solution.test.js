const test = require('node:test');
const assert = require('node:assert');
const { numWays } = require('./solution');

// BigInt DP without the width cap (exact), reduced mod at the end.
function exact(steps, arrLen) {
  const W = Math.min(arrLen, steps + 1);
  let cur = new Array(W).fill(0n);
  cur[0] = 1n;
  for (let s = 0; s < steps; s++) {
    const nx = new Array(W).fill(0n);
    for (let i = 0; i < W; i++) nx[i] = cur[i] + (i > 0 ? cur[i - 1] : 0n) + (i + 1 < W ? cur[i + 1] : 0n);
    cur = nx;
  }
  return Number(cur[0] % 1000000007n);
}
function enumerate(steps, arrLen) {
  let count = 0;
  const rec = (s, p) => {
    if (p < 0 || p >= arrLen) return;
    if (s === steps) { if (p === 0) count++; return; }
    rec(s + 1, p - 1); rec(s + 1, p); rec(s + 1, p + 1);
  };
  rec(0, 0);
  return count;
}

test('official examples', () => {
  assert.strictEqual(numWays(3, 2), 4);
  assert.strictEqual(numWays(2, 4), 2);
  assert.strictEqual(numWays(4, 2), 8);
});

test('arrLen = 1 means only staying', () => {
  assert.strictEqual(numWays(1, 1), 1);
  assert.strictEqual(numWays(500, 1), 1);
});

test('matches full enumeration on small inputs', () => {
  for (let steps = 1; steps <= 9; steps++) for (let len = 1; len <= 6; len++) {
    assert.strictEqual(numWays(steps, len), enumerate(steps, len));
  }
});

test('matches exact BigInt DP (no width cap), including huge arrLen', () => {
  for (const [s, l] of [[27, 7], [100, 1e6], [250, 3], [499, 1e6], [500, 1e6], [500, 250], [500, 251], [500, 252]]) {
    assert.strictEqual(numWays(s, l), exact(s, l));
  }
});
