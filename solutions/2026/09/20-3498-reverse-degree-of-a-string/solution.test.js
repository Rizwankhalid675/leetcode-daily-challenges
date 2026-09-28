const test = require('node:test');
const assert = require('node:assert');
const { reverseDegree } = require('./solution');

test('official examples', () => {
  assert.strictEqual(reverseDegree('abc'), 148); // 26*1 + 25*2 + 24*3
  assert.strictEqual(reverseDegree('zaza'), 160); // 1*1 + 26*2 + 1*3 + 26*4
});

test('edge cases', () => {
  assert.strictEqual(reverseDegree('a'), 26);
  assert.strictEqual(reverseDegree('z'), 1);
  // maximum: 1000 'a's -> 26 * (1 + ... + 1000)
  assert.strictEqual(reverseDegree('a'.repeat(1000)), 26 * 500500);
});
