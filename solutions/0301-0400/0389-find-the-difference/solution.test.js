const test = require('node:test');
const assert = require('node:assert');
const { findTheDifference } = require('./solution');

test('official examples', () => {
  assert.strictEqual(findTheDifference('abcd', 'abcde'), 'e');
  assert.strictEqual(findTheDifference('', 'y'), 'y');
});

test('random shuffles with one inserted letter (often a repeat)', () => {
  for (let t = 0; t < 1000; t++) {
    const s = Array.from({ length: Math.floor(Math.random() * 10) }, () => 'abcz'[Math.floor(Math.random() * 4)]);
    const extra = 'abcz'[Math.floor(Math.random() * 4)];
    const arr = s.concat(extra).sort(() => Math.random() - 0.5);
    assert.strictEqual(findTheDifference(s.join(''), arr.join('')), extra);
  }
});
