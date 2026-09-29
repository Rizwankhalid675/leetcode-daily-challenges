const test = require('node:test');
const assert = require('node:assert');
const { minimumDeleteSum } = require('./solution');

const ri = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const rarr = (n, lo, hi) => Array.from({ length: n }, () => ri(lo, hi));
const ascii = (s) => [...s].reduce((t, c) => t + c.charCodeAt(0), 0);
function subs(s) {
  const out = new Set();
  for (let mask = 0; mask < 1 << s.length; mask++) {
    let t = '';
    for (let i = 0; i < s.length; i++) if (mask >> i & 1) t += s[i];
    out.add(t);
  }
  return out;
}
function brute(s1, s2) {
  const a = subs(s1);
  let keep = 0;
  for (const t of subs(s2)) if (a.has(t)) keep = Math.max(keep, ascii(t));
  return ascii(s1) + ascii(s2) - 2 * keep;
}
const rstr = (n) => Array.from({ length: n }, () => 'abcxyz'[ri(0, 5)]).join('');

test('official examples', () => {
  assert.strictEqual(minimumDeleteSum('sea', 'eat'), 231);
  assert.strictEqual(minimumDeleteSum('delete', 'leet'), 403);
});

test('matches enumeration of common subsequences', () => {
  for (let t = 0; t < 400; t++) {
    const s1 = rstr(ri(1, 8)), s2 = rstr(ri(1, 8));
    assert.strictEqual(minimumDeleteSum(s1, s2), brute(s1, s2));
  }
});

test('max size runs fast', () => {
  const t0 = Date.now();
  minimumDeleteSum(rstr(1000), rstr(1000));
  assert.ok(Date.now() - t0 < 1000);
});
