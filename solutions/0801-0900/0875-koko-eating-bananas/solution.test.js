const test = require('node:test');
const assert = require('node:assert');
const { minEatingSpeed } = require('./solution');

function brute(piles, h) {
  for (let k = 1; ; k++) if (piles.reduce((s, p) => s + Math.ceil(p / k), 0) <= h) return k;
}

test('official examples', () => {
  assert.strictEqual(minEatingSpeed([3, 6, 7, 11], 8), 4);
  assert.strictEqual(minEatingSpeed([30, 11, 23, 4, 20], 5), 30);
  assert.strictEqual(minEatingSpeed([30, 11, 23, 4, 20], 6), 23);
});

test('edge cases', () => {
  assert.strictEqual(minEatingSpeed([1e9], 1), 1e9); // one hour for one huge pile
  assert.strictEqual(minEatingSpeed([1e9], 1e9), 1); // plenty of time
  assert.strictEqual(minEatingSpeed([1, 1, 1], 3), 1);
});

test('matches brute force', () => {
  for (let t = 0; t < 500; t++) {
    const piles = Array.from({ length: 1 + Math.floor(Math.random() * 5) }, () => 1 + Math.floor(Math.random() * 30));
    const h = piles.length + Math.floor(Math.random() * 20);
    assert.strictEqual(minEatingSpeed(piles, h), brute(piles, h), JSON.stringify([piles, h]));
  }
});
