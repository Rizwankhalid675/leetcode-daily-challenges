const test = require('node:test');
const assert = require('node:assert');
const { mergeAlternately } = require('./solution');

test('official examples', () => {
  assert.strictEqual(mergeAlternately('abc', 'pqr'), 'apbqcr');
  assert.strictEqual(mergeAlternately('ab', 'pqrs'), 'apbqrs');
  assert.strictEqual(mergeAlternately('abcd', 'pq'), 'apbqcd');
});

test('edge cases', () => {
  assert.strictEqual(mergeAlternately('a', 'b'), 'ab');
  assert.strictEqual(mergeAlternately('a', 'bcd'), 'abcd');
  assert.strictEqual(mergeAlternately('x'.repeat(100), 'y'), 'xy' + 'x'.repeat(99));
});
