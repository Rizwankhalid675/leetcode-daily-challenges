const test = require('node:test');
const assert = require('node:assert');
const { findSubstring } = require('./solution');

// Reference: check every start by counting words in the fixed-length block.
function brute(s, words) {
  const L = words[0].length;
  const total = L * words.length;
  const sorted = [...words].sort().join('|');
  const out = [];
  for (let i = 0; i + total <= s.length; i++) {
    const parts = [];
    for (let j = 0; j < words.length; j++) parts.push(s.slice(i + j * L, i + (j + 1) * L));
    if (parts.sort().join('|') === sorted) out.push(i);
  }
  return out;
}
const sortNum = (a) => [...a].sort((x, y) => x - y);

test('official examples (any order)', () => {
  assert.deepStrictEqual(sortNum(findSubstring('barfoothefoobarman', ['foo', 'bar'])), [0, 9]);
  assert.deepStrictEqual(findSubstring('wordgoodgoodgoodbestword', ['word', 'good', 'best', 'word']), []);
  assert.deepStrictEqual(sortNum(findSubstring('barfoofoobarthefoobarman', ['bar', 'foo', 'the'])), [6, 9, 12]);
});

test('duplicate words and random comparison', () => {
  assert.deepStrictEqual(sortNum(findSubstring('aaaaaa', ['aa', 'aa'])), [0, 1, 2]);
  for (let t = 0; t < 800; t++) {
    const L = 1 + Math.floor(Math.random() * 2);
    const r = (n) => Array.from({ length: n }, () => 'ab'[Math.floor(Math.random() * 2)]).join('');
    const words = Array.from({ length: 1 + Math.floor(Math.random() * 3) }, () => r(L));
    const s = r(Math.floor(Math.random() * 12) + 1);
    assert.deepStrictEqual(sortNum(findSubstring(s, words)), brute(s, words), JSON.stringify([s, words]));
  }
});
