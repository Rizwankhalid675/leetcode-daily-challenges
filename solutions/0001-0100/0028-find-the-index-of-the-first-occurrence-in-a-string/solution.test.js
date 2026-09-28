const test = require('node:test');
const assert = require('node:assert');
const { strStr } = require('./solution');

test('official examples', () => {
  assert.strictEqual(strStr('sadbutsad', 'sad'), 0);
  assert.strictEqual(strStr('leetcode', 'leeto'), -1);
});

test('KMP fallback cases and random comparison with indexOf', () => {
  assert.strictEqual(strStr('aaaaab', 'aab'), 3);
  assert.strictEqual(strStr('abababcab', 'ababc'), 2); // needs lps fallback mid-match
  assert.strictEqual(strStr('a', 'aa'), -1);
  for (let t = 0; t < 3000; t++) {
    const r = (n) => Array.from({ length: n }, () => 'ab'[Math.floor(Math.random() * 2)]).join('');
    const h = r(1 + Math.floor(Math.random() * 15));
    const n = r(1 + Math.floor(Math.random() * 4));
    assert.strictEqual(strStr(h, n), h.indexOf(n), JSON.stringify([h, n]));
  }
});

test('worst case for naive search is linear here', () => {
  const h = 'a'.repeat(1e4 - 1) + 'b';
  const n = 'a'.repeat(5000) + 'b';
  assert.strictEqual(strStr(h, n), 1e4 - 5001);
});
