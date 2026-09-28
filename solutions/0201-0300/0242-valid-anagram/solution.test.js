const test = require('node:test');
const assert = require('node:assert');
const { isAnagram } = require('./solution');

const sorted = (s) => [...s].sort().join('');

test('official examples', () => {
  assert.strictEqual(isAnagram('anagram', 'nagaram'), true);
  assert.strictEqual(isAnagram('rat', 'car'), false);
});

test('matches sort-based comparison', () => {
  assert.strictEqual(isAnagram('a', 'ab'), false);
  for (let t = 0; t < 2000; t++) {
    const r = () => Array.from({ length: 1 + Math.floor(Math.random() * 6) }, () => 'abc'[Math.floor(Math.random() * 3)]).join('');
    const a = r();
    const b = Math.random() < 0.5 ? [...a].sort(() => Math.random() - 0.5).join('') : r();
    assert.strictEqual(isAnagram(a, b), sorted(a) === sorted(b));
  }
});
