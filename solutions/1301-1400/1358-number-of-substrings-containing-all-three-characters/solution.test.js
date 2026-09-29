const test = require('node:test');
const assert = require('node:assert');
const { numberOfSubstrings } = require('./solution');

function brute(s) {
  let c = 0;
  for (let i = 0; i < s.length; i++) {
    const seen = new Set();
    for (let j = i; j < s.length; j++) {
      seen.add(s[j]);
      if (seen.size === 3) c++;
    }
  }
  return c;
}

test('official examples', () => {
  assert.strictEqual(numberOfSubstrings('abcabc'), 10);
  assert.strictEqual(numberOfSubstrings('aaacb'), 3);
  assert.strictEqual(numberOfSubstrings('abc'), 1);
});

test('matches brute force on random strings', () => {
  for (let t = 0; t < 800; t++) {
    const n = 3 + Math.floor(Math.random() * 15);
    const s = Array.from({ length: n }, () => 'abc'[Math.floor(Math.random() * 3)]).join('');
    assert.strictEqual(numberOfSubstrings(s), brute(s));
  }
});

test('missing letter gives 0; max size fits', () => {
  assert.strictEqual(numberOfSubstrings('aabbaabb'), 0);
  const n = 50000;
  const s = 'abc'.repeat(Math.ceil(n / 3)).slice(0, n);
  // every substring of length >= 3 contains all three letters
  const expected = ((n - 2) * (n - 1)) / 2;
  assert.strictEqual(numberOfSubstrings(s), expected);
});
