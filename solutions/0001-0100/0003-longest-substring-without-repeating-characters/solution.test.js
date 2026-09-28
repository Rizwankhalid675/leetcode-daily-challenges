const test = require('node:test');
const assert = require('node:assert');
const { lengthOfLongestSubstring } = require('./solution');

function brute(s) {
  let best = 0;
  for (let i = 0; i < s.length; i++) for (let j = i; j < s.length; j++) if (new Set(s.slice(i, j + 1)).size === j - i + 1) best = Math.max(best, j - i + 1);
  return best;
}

test('official examples', () => {
  assert.strictEqual(lengthOfLongestSubstring('abcabcbb'), 3);
  assert.strictEqual(lengthOfLongestSubstring('bbbbb'), 1);
  assert.strictEqual(lengthOfLongestSubstring('pwwkew'), 3);
});

test('edge cases and random', () => {
  assert.strictEqual(lengthOfLongestSubstring(''), 0);
  assert.strictEqual(lengthOfLongestSubstring(' '), 1);
  assert.strictEqual(lengthOfLongestSubstring('abba'), 2); // stale lastSeen must not move left backwards
  for (let t = 0; t < 1000; t++) {
    const s = Array.from({ length: Math.floor(Math.random() * 12) }, () => 'abc d'[Math.floor(Math.random() * 5)]).join('');
    assert.strictEqual(lengthOfLongestSubstring(s), brute(s), JSON.stringify(s));
  }
});
