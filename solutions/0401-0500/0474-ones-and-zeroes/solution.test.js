const test = require('node:test');
const assert = require('node:assert');
const { findMaxForm } = require('./solution');

const ri = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const rarr = (n, lo, hi) => Array.from({ length: n }, () => ri(lo, hi));
function brute(strs, m, n) {
  let best = 0;
  for (let mask = 0; mask < 1 << strs.length; mask++) {
    let z = 0, o = 0, c = 0;
    for (let i = 0; i < strs.length; i++) if (mask >> i & 1) {
      for (const ch of strs[i]) ch === '0' ? z++ : o++;
      c++;
    }
    if (z <= m && o <= n) best = Math.max(best, c);
  }
  return best;
}
const rbin = (len) => Array.from({ length: len }, () => (Math.random() < 0.5 ? '0' : '1')).join('');

test('official examples', () => {
  assert.strictEqual(findMaxForm(['10', '0001', '111001', '1', '0'], 5, 3), 4);
  assert.strictEqual(findMaxForm(['10', '0', '1'], 1, 1), 2);
});

test('matches subset enumeration', () => {
  for (let t = 0; t < 400; t++) {
    const strs = Array.from({ length: ri(1, 10) }, () => rbin(ri(1, 4)));
    const m = ri(1, 6), n = ri(1, 6);
    assert.strictEqual(findMaxForm(strs, m, n), brute(strs, m, n));
  }
});

test('max size runs fast', () => {
  const strs = Array.from({ length: 600 }, () => rbin(ri(1, 100)));
  const t0 = Date.now();
  findMaxForm(strs, 100, 100);
  assert.ok(Date.now() - t0 < 1000);
});
