const test = require('node:test');
const assert = require('node:assert');
const { maxUncrossedLines } = require('./solution');

const ri = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const rarr = (n, lo, hi) => Array.from({ length: n }, () => ri(lo, hi));
// Search over sets of lines directly: every line is a pair (i, j) with equal values, and no two cross or share an endpoint.
function brute(a, b) {
  const edges = [];
  for (let i = 0; i < a.length; i++) for (let j = 0; j < b.length; j++) if (a[i] === b[j]) edges.push([i, j]);
  let best = 0;
  const go = (k, chosen) => {
    if (chosen.length + (edges.length - k) <= best) return;
    if (k === edges.length) { best = chosen.length; return; }
    const [i, j] = edges[k];
    if (chosen.every(([p, q]) => (p < i && q < j) || (p > i && q > j))) {
      chosen.push(edges[k]);
      go(k + 1, chosen);
      chosen.pop();
    }
    go(k + 1, chosen);
  };
  go(0, []);
  return best;
}

test('official examples', () => {
  assert.strictEqual(maxUncrossedLines([1, 4, 2], [1, 2, 4]), 2);
  assert.strictEqual(maxUncrossedLines([2, 5, 1, 2, 5], [10, 5, 2, 1, 5, 2]), 3);
  assert.strictEqual(maxUncrossedLines([1, 3, 7, 1, 7, 5], [1, 9, 2, 5, 1]), 2);
});

test('matches a search over non-crossing line sets', () => {
  for (let t = 0; t < 400; t++) {
    const a = rarr(ri(1, 7), 1, 3), b = rarr(ri(1, 7), 1, 3);
    assert.strictEqual(maxUncrossedLines(a, b), brute(a, b));
  }
});

test('max size runs fast', () => {
  const t0 = Date.now();
  maxUncrossedLines(rarr(500, 1, 2000), rarr(500, 1, 2000));
  assert.ok(Date.now() - t0 < 1000);
});
