const test = require('node:test');
const assert = require('node:assert');
const { longestArithSeqLength } = require('./solution');

const ri = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const rarr = (n, lo, hi) => Array.from({ length: n }, () => ri(lo, hi));
function brute(a) {
  let best = 0;
  for (let mask = 1; mask < 1 << a.length; mask++) {
    const s = a.filter((_, i) => mask >> i & 1);
    let ok = true;
    for (let i = 2; i < s.length; i++) if (s[i] - s[i - 1] !== s[1] - s[0]) ok = false;
    if (ok) best = Math.max(best, s.length);
  }
  return best;
}

test('official examples', () => {
  assert.strictEqual(longestArithSeqLength([3, 6, 9, 12]), 4);
  assert.strictEqual(longestArithSeqLength([9, 4, 7, 2, 10]), 3);
  assert.strictEqual(longestArithSeqLength([20, 1, 15, 3, 10, 5, 8]), 4);
});

test('extreme differences', () => {
  assert.strictEqual(longestArithSeqLength([0, 500]), 2);
  assert.strictEqual(longestArithSeqLength([500, 0, 500, 0]), 2);
  assert.strictEqual(longestArithSeqLength([7, 7, 7, 7, 7]), 5);
});

test('matches subset enumeration', () => {
  for (let t = 0; t < 500; t++) {
    const a = rarr(ri(2, 12), 0, 8);
    assert.strictEqual(longestArithSeqLength(a), brute(a));
  }
});

test('max size runs fast', () => {
  const a = rarr(1500, 0, 500);
  const t0 = Date.now();
  longestArithSeqLength(a);
  assert.ok(Date.now() - t0 < 1000);
  assert.strictEqual(longestArithSeqLength(new Array(1500).fill(3)), 1500);
});
