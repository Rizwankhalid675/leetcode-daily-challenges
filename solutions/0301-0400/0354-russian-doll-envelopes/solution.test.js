const test = require('node:test');
const assert = require('node:assert');
const { maxEnvelopes } = require('./solution');

const ri = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const rarr = (n, lo, hi) => Array.from({ length: n }, () => ri(lo, hi));
function brute(env) {
  let best = 0;
  for (let mask = 1; mask < 1 << env.length; mask++) {
    const s = env.filter((_, i) => mask >> i & 1).sort((a, b) => a[0] - b[0]);
    let ok = true;
    for (let i = 1; i < s.length; i++) if (!(s[i][0] > s[i - 1][0] && s[i][1] > s[i - 1][1])) ok = false;
    if (ok) best = Math.max(best, s.length);
  }
  return best;
}

test('official examples', () => {
  assert.strictEqual(maxEnvelopes([[5, 4], [6, 4], [6, 7], [2, 3]]), 3);
  assert.strictEqual(maxEnvelopes([[1, 1], [1, 1], [1, 1]]), 1);
});

test('equal widths cannot nest', () => {
  assert.strictEqual(maxEnvelopes([[1, 1], [1, 2], [1, 3], [1, 4]]), 1);
  assert.strictEqual(maxEnvelopes([[4, 5], [4, 6], [6, 7], [2, 3], [1, 1]]), 4);
});

test('matches subset enumeration', () => {
  for (let t = 0; t < 500; t++) {
    const env = Array.from({ length: ri(1, 11) }, () => [ri(1, 5), ri(1, 5)]);
    assert.strictEqual(maxEnvelopes(env), brute(env));
  }
});

test('max size (1e5) runs fast', () => {
  const env = Array.from({ length: 100000 }, () => [ri(1, 100000), ri(1, 100000)]);
  let t0 = Date.now();
  maxEnvelopes(env);
  assert.ok(Date.now() - t0 < 1000);
  const chain = Array.from({ length: 100000 }, (_, i) => [i + 1, i + 1]);
  t0 = Date.now();
  assert.strictEqual(maxEnvelopes(chain), 100000);
  assert.ok(Date.now() - t0 < 1000);
});
