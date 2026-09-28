const test = require('node:test');
const assert = require('node:assert');
const { distinctSubseqII } = require('./solution');

function brute(s) {
  const seen = new Set();
  for (let mask = 1; mask < 1 << s.length; mask++) {
    let sub = '';
    for (let i = 0; i < s.length; i++) if (mask & (1 << i)) sub += s[i];
    seen.add(sub);
  }
  return seen.size;
}

test('official examples', () => {
  assert.strictEqual(distinctSubseqII('abc'), 7);
  assert.strictEqual(distinctSubseqII('aba'), 6);
  assert.strictEqual(distinctSubseqII('aaa'), 3);
});

test('matches brute force on random small strings', () => {
  for (let k = 0; k < 300; k++) {
    const s = Array.from({ length: 1 + Math.floor(Math.random() * 12) }, () => 'abc'[Math.floor(Math.random() * 3)]).join('');
    assert.strictEqual(distinctSubseqII(s), brute(s), s);
  }
});

test('modulo stays in range for n = 2000', () => {
  const s = Array.from({ length: 2000 }, (_, i) => String.fromCharCode(97 + (i % 26))).join('');
  const ans = distinctSubseqII(s);
  assert.ok(Number.isInteger(ans) && ans >= 0 && ans < 1_000_000_007);
});
