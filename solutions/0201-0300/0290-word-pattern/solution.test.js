const test = require('node:test');
const assert = require('node:assert');
const { wordPattern } = require('./solution');

const signature = (items) => items.map((x) => items.indexOf(x)).join(',');

test('official examples', () => {
  assert.strictEqual(wordPattern('abba', 'dog cat cat dog'), true);
  assert.strictEqual(wordPattern('abba', 'dog cat cat fish'), false);
  assert.strictEqual(wordPattern('aaaa', 'dog cat cat dog'), false);
});

test('length mismatch, reverse collision, random', () => {
  assert.strictEqual(wordPattern('aaa', 'dog dog'), false);
  assert.strictEqual(wordPattern('ab', 'dog dog'), false); // two letters -> same word
  // "constructor" as a word must not collide with Object prototype keys (Map avoids that)
  assert.strictEqual(wordPattern('ab', 'constructor toString'), true);
  for (let t = 0; t < 2000; t++) {
    const n = 1 + Math.floor(Math.random() * 5);
    const pattern = Array.from({ length: n }, () => 'ab'[Math.floor(Math.random() * 2)]).join('');
    const words = Array.from({ length: n }, () => ['dog', 'cat', 'fish'][Math.floor(Math.random() * 3)]);
    assert.strictEqual(wordPattern(pattern, words.join(' ')), signature([...pattern]) === signature(words));
  }
});
