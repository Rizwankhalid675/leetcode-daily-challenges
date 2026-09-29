const test = require('node:test');
const assert = require('node:assert');
const { findMaximizedCapital } = require('./solution');

// Independent oracle: try every sequence of up to k distinct feasible projects.
function brute(k, w, profits, capital) {
  const n = profits.length;
  let best = w;
  const go = (left, cap, used) => {
    best = Math.max(best, cap);
    if (left === 0) return;
    for (let i = 0; i < n; i++) {
      if (used & (1 << i) || capital[i] > cap) continue;
      go(left - 1, cap + profits[i], used | (1 << i));
    }
  };
  go(k, w, 0);
  return best;
}

test('official examples', () => {
  assert.strictEqual(findMaximizedCapital(2, 0, [1, 2, 3], [0, 1, 1]), 4);
  assert.strictEqual(findMaximizedCapital(3, 0, [1, 2, 3], [0, 1, 2]), 6);
});

test('nothing affordable', () => {
  assert.strictEqual(findMaximizedCapital(3, 0, [5, 6], [1, 2]), 0);
});

test('matches exhaustive search', () => {
  for (let t = 0; t < 500; t++) {
    const n = 1 + Math.floor(Math.random() * 6);
    const profits = Array.from({ length: n }, () => Math.floor(Math.random() * 6));
    const capital = Array.from({ length: n }, () => Math.floor(Math.random() * 8));
    const k = 1 + Math.floor(Math.random() * 4);
    const w = Math.floor(Math.random() * 4);
    assert.strictEqual(findMaximizedCapital(k, w, profits, capital), brute(k, w, profits, capital));
  }
});

test('10^5 projects, k = 10^5 is fast', () => {
  const n = 100000;
  const profits = Array.from({ length: n }, () => Math.floor(Math.random() * 1e4));
  const capital = Array.from({ length: n }, () => Math.floor(Math.random() * 1e9));
  const t0 = Date.now();
  const got = findMaximizedCapital(n, 1e9, profits, capital);
  assert.strictEqual(got, 1e9 + profits.reduce((a, b) => a + b, 0));
  assert.ok(Date.now() - t0 < 1000);
});
