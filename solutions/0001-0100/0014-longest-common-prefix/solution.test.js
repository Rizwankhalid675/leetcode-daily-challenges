const test = require('node:test');
const assert = require('node:assert');
const { longestCommonPrefix } = require('./solution');

const reference = (strs) => {
  let p = strs[0];
  for (const s of strs) while (!s.startsWith(p)) p = p.slice(0, -1);
  return p;
};

test('official examples', () => {
  assert.strictEqual(longestCommonPrefix(['flower', 'flow', 'flight']), 'fl');
  assert.strictEqual(longestCommonPrefix(['dog', 'racecar', 'car']), '');
});

test('edge cases and random', () => {
  assert.strictEqual(longestCommonPrefix(['alone']), 'alone');
  assert.strictEqual(longestCommonPrefix(['', 'abc']), '');
  assert.strictEqual(longestCommonPrefix(['abc', 'ab']), 'ab'); // shorter later string
  for (let t = 0; t < 1000; t++) {
    const strs = Array.from({ length: 1 + Math.floor(Math.random() * 5) }, () => Array.from({ length: Math.floor(Math.random() * 5) }, () => 'ab'[Math.floor(Math.random() * 2)]).join(''));
    assert.strictEqual(longestCommonPrefix(strs), reference(strs), JSON.stringify(strs));
  }
});
