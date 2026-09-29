const test = require('node:test');
const assert = require('node:assert');
const { findLongestChain } = require('./solution');

const ri = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const rarr = (n, lo, hi) => Array.from({ length: n }, () => ri(lo, hi));
function brute(pairs) {
  let best = 0;
  for (let mask = 1; mask < 1 << pairs.length; mask++) {
    const s = pairs.filter((_, i) => mask >> i & 1).sort((x, y) => x[1] - y[1]);
    let ok = true;
    for (let i = 1; i < s.length; i++) if (s[i - 1][1] >= s[i][0]) ok = false;
    if (ok) best = Math.max(best, s.length);
  }
  return best;
}
function rpair() {
  const l = ri(-6, 5);
  return [l, ri(l + 1, 6)];
}

test('official examples', () => {
  assert.strictEqual(findLongestChain([[1, 2], [2, 3], [3, 4]]), 2);
  assert.strictEqual(findLongestChain([[1, 2], [7, 8], [4, 5]]), 3);
});

test('does not mutate the input', () => {
  const p = [[3, 4], [1, 2]];
  findLongestChain(p);
  assert.deepStrictEqual(p, [[3, 4], [1, 2]]);
});

test('matches subset enumeration', () => {
  for (let t = 0; t < 500; t++) {
    const p = Array.from({ length: ri(1, 10) }, rpair);
    assert.strictEqual(findLongestChain(p), brute(p));
  }
});
