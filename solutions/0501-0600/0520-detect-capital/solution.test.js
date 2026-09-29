const test = require('node:test');
const assert = require('node:assert');
const { detectCapitalUse } = require('./solution');

test('official examples', () => {
  assert.strictEqual(detectCapitalUse('USA'), true);
  assert.strictEqual(detectCapitalUse('FlaG'), false);
});

test('edge cases', () => {
  assert.strictEqual(detectCapitalUse('leetcode'), true);
  assert.strictEqual(detectCapitalUse('Google'), true);
  assert.strictEqual(detectCapitalUse('g'), true);
  assert.strictEqual(detectCapitalUse('gOOGLE'), false);
});
