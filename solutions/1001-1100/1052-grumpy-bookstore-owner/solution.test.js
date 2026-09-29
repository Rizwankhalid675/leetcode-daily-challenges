const test = require('node:test');
const assert = require('node:assert');
const { maxSatisfied } = require('./solution');

function brute(c, g, m) {
  let best = 0;
  for (let st = 0; st + m <= c.length; st++) {
    let s = 0;
    for (let i = 0; i < c.length; i++) if (g[i] === 0 || (i >= st && i < st + m)) s += c[i];
    best = Math.max(best, s);
  }
  return best;
}

test('official examples', () => {
  assert.strictEqual(maxSatisfied([1, 0, 1, 2, 1, 1, 7, 5], [0, 1, 0, 1, 0, 1, 0, 1], 3), 16);
  assert.strictEqual(maxSatisfied([1], [0], 1), 1);
});

test('matches brute force', () => {
  for (let t = 0; t < 1000; t++) {
    const n = 1 + Math.floor(Math.random() * 12);
    const c = Array.from({ length: n }, () => Math.floor(Math.random() * 10));
    const g = Array.from({ length: n }, () => Math.round(Math.random()));
    const m = 1 + Math.floor(Math.random() * n);
    assert.strictEqual(maxSatisfied(c, g, m), brute(c, g, m));
  }
});
