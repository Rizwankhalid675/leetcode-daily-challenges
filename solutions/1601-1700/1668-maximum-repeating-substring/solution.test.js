const test = require('node:test');
const assert = require('node:assert');
const { maxRepeating } = require('./solution');

test('official examples', () => {
  assert.strictEqual(maxRepeating('ababc', 'ab'), 2);
  assert.strictEqual(maxRepeating('ababc', 'ba'), 1);
  assert.strictEqual(maxRepeating('ababc', 'ac'), 0);
});

test('overlapping occurrences and full repeats', () => {
  assert.strictEqual(maxRepeating('aaabaaaabaaabaaaabaaaabaaaabaaaaba', 'aaaba'), 5);
  assert.strictEqual(maxRepeating('aaaa', 'a'), 4);
});
