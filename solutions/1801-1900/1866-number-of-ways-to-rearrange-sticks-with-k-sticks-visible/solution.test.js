const test = require('node:test');
const assert = require('node:assert');
const { rearrangeSticks } = require('./solution');

function brute(n, k) {
  // count permutations of 1..n with exactly k left-to-right maxima
  let count = 0;
  const used = new Array(n + 1).fill(false);
  const go = (depth, max, vis) => {
    if (vis > k) return;
    if (depth === n) { if (vis === k) count++; return; }
    for (let v = 1; v <= n; v++) {
      if (used[v]) continue;
      used[v] = true;
      go(depth + 1, Math.max(max, v), vis + (v > max ? 1 : 0));
      used[v] = false;
    }
  };
  go(0, 0, 0);
  return count;
}

function bigStirling(n, k) {
  // exact BigInt reference with the same recurrence, reduced at the end
  let dp = [1n];
  for (let i = 1; i <= n; i++) {
    const next = new Array(i + 1).fill(0n);
    for (let j = 1; j <= i; j++) next[j] = (dp[j - 1] ?? 0n) + BigInt(i - 1) * (dp[j] ?? 0n);
    dp = next;
  }
  return Number(dp[k] % 1000000007n);
}

test('official examples', () => {
  assert.strictEqual(rearrangeSticks(3, 2), 3);
  assert.strictEqual(rearrangeSticks(5, 5), 1);
  assert.strictEqual(rearrangeSticks(20, 11), 647427950);
});

test('matches permutation brute force for n <= 7', () => {
  for (let n = 1; n <= 7; n++) for (let k = 1; k <= n; k++) {
    assert.strictEqual(rearrangeSticks(n, k), brute(n, k), n + ',' + k);
  }
});

test('matches exact BigInt Stirling numbers (no modular drift)', () => {
  for (const [n, k] of [[60, 1], [60, 7], [60, 30], [120, 5], [120, 60], [150, 149]]) {
    assert.strictEqual(rearrangeSticks(n, k), bigStirling(n, k), n + ',' + k);
  }
  assert.strictEqual(rearrangeSticks(1000, 1000), 1);
  // k = 1: (n-1)! mod p
  let f = 1n;
  for (let i = 1n; i < 1000n; i++) f = (f * i) % 1000000007n;
  assert.strictEqual(rearrangeSticks(1000, 1), Number(f));
});

test('max size runs fast', () => {
  const t0 = Date.now();
  rearrangeSticks(1000, 500);
  assert.ok(Date.now() - t0 < 1000);
});
