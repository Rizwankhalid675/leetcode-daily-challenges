const test = require('node:test');
const assert = require('node:assert');
const { maxDepth } = require('./solution');

test('official examples', () => {
  assert.strictEqual(maxDepth('(1+(2*3)+((8)/4))+1'), 3);
  assert.strictEqual(maxDepth('(1)+((2))+(((3)))'), 3);
  assert.strictEqual(maxDepth('()(())((()()))'), 3);
});

test('edge cases', () => {
  assert.strictEqual(maxDepth('1'), 0); // no parentheses at all
  assert.strictEqual(maxDepth('1+2*3'), 0);
  assert.strictEqual(maxDepth('()'), 1);
  assert.strictEqual(maxDepth('()()()'), 1); // siblings do not add depth
  assert.strictEqual(maxDepth('('.repeat(50) + ')'.repeat(50)), 50); // max length 100
});
