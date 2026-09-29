const test = require('node:test');
const assert = require('node:assert');
const { characterReplacement } = require('./solution');

function brute(s, k) {
  let best = 0;
  for (let i = 0; i < s.length; i++) {
    const f = {};
    let mx = 0;
    for (let j = i; j < s.length; j++) {
      f[s[j]] = (f[s[j]] || 0) + 1;
      mx = Math.max(mx, f[s[j]]);
      if (j - i + 1 - mx <= k) best = Math.max(best, j - i + 1);
    }
  }
  return best;
}

test('official examples', () => {
  assert.strictEqual(characterReplacement('ABAB', 2), 4);
  assert.strictEqual(characterReplacement('AABABBA', 1), 4);
});

test('matches brute force', () => {
  for (let t = 0; t < 1000; t++) {
    const n = 1 + Math.floor(Math.random() * 14);
    const s = Array.from({ length: n }, () => 'ABC'[Math.floor(Math.random() * 3)]).join('');
    const k = Math.floor(Math.random() * (n + 1));
    assert.strictEqual(characterReplacement(s, k), brute(s, k));
  }
});

test('edges', () => {
  assert.strictEqual(characterReplacement('A', 0), 1);
  assert.strictEqual(characterReplacement('ABCDE', 0), 1);
  assert.strictEqual(characterReplacement('ABCDE', 5), 5);
});
