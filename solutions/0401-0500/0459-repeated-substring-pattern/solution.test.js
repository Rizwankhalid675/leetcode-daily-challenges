const test = require('node:test');
const assert = require('node:assert');
const { repeatedSubstringPattern } = require('./solution');

function brute(s) {
  for (let len = 1; len <= s.length / 2; len++) if (s.length % len === 0 && s.slice(0, len).repeat(s.length / len) === s) return true;
  return false;
}

test('official examples', () => {
  assert.strictEqual(repeatedSubstringPattern('abab'), true);
  assert.strictEqual(repeatedSubstringPattern('aba'), false);
  assert.strictEqual(repeatedSubstringPattern('abcabcabcabc'), true);
});

test('matches divisor brute force', () => {
  for (let t = 0; t < 2000; t++) {
    const unit = Array.from({ length: 1 + Math.floor(Math.random() * 3) }, () => 'ab'[Math.floor(Math.random() * 2)]).join('');
    const s = Math.random() < 0.5 ? unit.repeat(1 + Math.floor(Math.random() * 4)) : Array.from({ length: 1 + Math.floor(Math.random() * 8) }, () => 'ab'[Math.floor(Math.random() * 2)]).join('');
    assert.strictEqual(repeatedSubstringPattern(s), brute(s), s);
  }
});
