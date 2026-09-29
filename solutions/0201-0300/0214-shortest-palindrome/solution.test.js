const test = require('node:test');
const assert = require('node:assert');
const { shortestPalindrome } = require('./solution');

function brute(s) {
  const isPal = (x) => x === x.split('').reverse().join('');
  for (let len = s.length; len >= 0; len--) {
    if (isPal(s.slice(0, len))) return s.slice(len).split('').reverse().join('') + s;
  }
}

test('official examples', () => {
  assert.strictEqual(shortestPalindrome('aacecaaa'), 'aaacecaaa');
  assert.strictEqual(shortestPalindrome('abcd'), 'dcbabcd');
});

test('empty and single', () => {
  assert.strictEqual(shortestPalindrome(''), '');
  assert.strictEqual(shortestPalindrome('a'), 'a');
  assert.strictEqual(shortestPalindrome('aba'), 'aba');
});

test('matches brute force', () => {
  for (let t = 0; t < 1500; t++) {
    const n = Math.floor(Math.random() * 14);
    const s = Array.from({ length: n }, () => 'ab'[Math.floor(Math.random() * 2)]).join('');
    assert.strictEqual(shortestPalindrome(s), brute(s));
  }
});

test('max-size adversarial input is fast', () => {
  const s = 'a'.repeat(25000) + 'b' + 'a'.repeat(24999);
  const t = Date.now();
  const out = shortestPalindrome(s);
  assert.ok(Date.now() - t < 1000);
  assert.strictEqual(out, brute(s));
});
