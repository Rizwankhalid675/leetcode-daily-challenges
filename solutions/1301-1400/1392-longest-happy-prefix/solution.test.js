const test = require('node:test');
const assert = require('node:assert');
const { longestPrefix } = require('./solution');

function brute(s) {
  for (let len = s.length - 1; len > 0; len--) {
    if (s.slice(0, len) === s.slice(s.length - len)) return s.slice(0, len);
  }
  return '';
}

test('official examples', () => {
  assert.strictEqual(longestPrefix('level'), 'l');
  assert.strictEqual(longestPrefix('ababab'), 'abab');
});

test('single char and no border', () => {
  assert.strictEqual(longestPrefix('a'), '');
  assert.strictEqual(longestPrefix('abc'), '');
  assert.strictEqual(longestPrefix('aaaa'), 'aaa');
});

test('matches brute force', () => {
  for (let t = 0; t < 1500; t++) {
    const n = 1 + Math.floor(Math.random() * 16);
    const s = Array.from({ length: n }, () => 'ab'[Math.floor(Math.random() * 2)]).join('');
    assert.strictEqual(longestPrefix(s), brute(s));
  }
});

test('max size is fast', () => {
  const s = 'a'.repeat(99999) + 'b';
  const t = Date.now();
  assert.strictEqual(longestPrefix(s), '');
  assert.strictEqual(longestPrefix('ab'.repeat(50000)), 'ab'.repeat(49999));
  assert.ok(Date.now() - t < 1000);
});
