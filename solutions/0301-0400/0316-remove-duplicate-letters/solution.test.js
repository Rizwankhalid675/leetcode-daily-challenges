const test = require('node:test');
const assert = require('node:assert');
const { removeDuplicateLetters } = require('./solution');

// Reference: smallest subsequence containing each distinct letter once, by brute force over subsequences (tiny strings).
function brute(s) {
  const need = new Set(s).size;
  let best = null;
  for (let mask = 1; mask < 1 << s.length; mask++) {
    let t = '';
    for (let i = 0; i < s.length; i++) if (mask & (1 << i)) t += s[i];
    if (t.length === need && new Set(t).size === need && (best === null || t < best)) best = t;
  }
  return best;
}

test('official examples', () => {
  assert.strictEqual(removeDuplicateLetters('bcabc'), 'abc');
  assert.strictEqual(removeDuplicateLetters('cbacdcbc'), 'acdb');
});

test('matches exhaustive search on small strings', () => {
  for (let t = 0; t < 500; t++) {
    const s = Array.from({ length: 1 + Math.floor(Math.random() * 10) }, () => 'abcd'[Math.floor(Math.random() * 4)]).join('');
    assert.strictEqual(removeDuplicateLetters(s), brute(s), s);
  }
});
