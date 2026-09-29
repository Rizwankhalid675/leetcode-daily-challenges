const test = require('node:test');
const assert = require('node:assert');
const { findMaxConsecutiveOnes } = require('./solution');

test('official examples', () => {
  assert.strictEqual(findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1]), 3);
  assert.strictEqual(findMaxConsecutiveOnes([1, 0, 1, 1, 0, 1]), 2);
});

test('edge cases and random', () => {
  assert.strictEqual(findMaxConsecutiveOnes([0]), 0);
  assert.strictEqual(findMaxConsecutiveOnes([1]), 1);
  for (let t = 0; t < 500; t++) {
    const a = Array.from({ length: 1 + Math.floor(Math.random() * 12) }, () => (Math.random() < 0.6 ? 1 : 0));
    const expected = Math.max(0, ...a.join('').split('0').map((s) => s.length));
    assert.strictEqual(findMaxConsecutiveOnes(a), expected);
  }
});
