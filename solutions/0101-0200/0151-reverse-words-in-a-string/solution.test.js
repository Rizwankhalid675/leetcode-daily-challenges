const test = require('node:test');
const assert = require('node:assert');
const { reverseWords } = require('./solution');

test('official examples', () => {
  assert.strictEqual(reverseWords('the sky is blue'), 'blue is sky the');
  assert.strictEqual(reverseWords('  hello world  '), 'world hello');
  assert.strictEqual(reverseWords('a good   example'), 'example good a');
});

test('edge cases', () => {
  assert.strictEqual(reverseWords('one'), 'one');
  assert.strictEqual(reverseWords('   one   '), 'one');
  assert.strictEqual(reverseWords('A1 b2  C3'), 'C3 b2 A1'); // digits and case kept
});
