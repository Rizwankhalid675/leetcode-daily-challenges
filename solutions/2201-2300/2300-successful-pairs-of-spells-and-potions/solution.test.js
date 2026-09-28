const test = require('node:test');
const assert = require('node:assert');
const { successfulPairs } = require('./solution');

const brute = (spells, potions, success) => spells.map((s) => potions.filter((p) => s * p >= success).length);

test('official examples', () => {
  assert.deepStrictEqual(successfulPairs([5, 1, 3], [1, 2, 3, 4, 5], 7), [4, 0, 3]);
  assert.deepStrictEqual(successfulPairs([3, 1, 2], [8, 5, 8], 16), [2, 0, 2]);
});

test('edge cases', () => {
  assert.deepStrictEqual(successfulPairs([1e5], [1e5], 1e10), [1]); // product exactly equals success
  assert.deepStrictEqual(successfulPairs([1], [1], 1e10), [0]);
  const potions = [3, 1, 2];
  successfulPairs([1], potions, 1);
  assert.deepStrictEqual(potions, [3, 1, 2]); // input not mutated
});

test('matches brute force', () => {
  for (let t = 0; t < 500; t++) {
    const spells = Array.from({ length: 1 + Math.floor(Math.random() * 6) }, () => 1 + Math.floor(Math.random() * 10));
    const potions = Array.from({ length: 1 + Math.floor(Math.random() * 8) }, () => 1 + Math.floor(Math.random() * 10));
    const success = 1 + Math.floor(Math.random() * 60);
    assert.deepStrictEqual(successfulPairs(spells, potions, success), brute(spells, potions, success));
  }
});
