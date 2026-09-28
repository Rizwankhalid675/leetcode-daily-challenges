const test = require('node:test');
const assert = require('node:assert');
const { maxVowels } = require('./solution');

function brute(s, k) {
  let best = 0;
  for (let i = 0; i + k <= s.length; i++) best = Math.max(best, [...s.slice(i, i + k)].filter((c) => 'aeiou'.includes(c)).length);
  return best;
}

test('official examples', () => {
  assert.strictEqual(maxVowels('abciiidef', 3), 3);
  assert.strictEqual(maxVowels('aeiou', 2), 2);
  assert.strictEqual(maxVowels('leetcode', 3), 2);
});

test('edge cases', () => {
  assert.strictEqual(maxVowels('bcd', 2), 0);
  assert.strictEqual(maxVowels('a', 1), 1);
});

test('matches brute force', () => {
  for (let t = 0; t < 1000; t++) {
    const s = Array.from({ length: 1 + Math.floor(Math.random() * 12) }, () => 'abeci'[Math.floor(Math.random() * 5)]).join('');
    const k = 1 + Math.floor(Math.random() * s.length);
    assert.strictEqual(maxVowels(s, k), brute(s, k), JSON.stringify([s, k]));
  }
});
