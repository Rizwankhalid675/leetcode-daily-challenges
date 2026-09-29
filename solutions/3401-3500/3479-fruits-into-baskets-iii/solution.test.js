const test = require('node:test');
const assert = require('node:assert');
const { numOfUnplacedFruits } = require('./solution');

function brute(fruits, baskets) {
  const used = new Array(baskets.length).fill(false);
  let unplaced = 0;
  for (const f of fruits) {
    const j = baskets.findIndex((b, i) => !used[i] && b >= f);
    if (j === -1) unplaced++; else used[j] = true;
  }
  return unplaced;
}

test('official examples', () => {
  assert.strictEqual(numOfUnplacedFruits([4, 2, 5], [3, 5, 4]), 1);
  assert.strictEqual(numOfUnplacedFruits([3, 6, 1], [6, 4, 7]), 0);
});

test('single element and non-power-of-two sizes', () => {
  assert.strictEqual(numOfUnplacedFruits([1], [1]), 0);
  assert.strictEqual(numOfUnplacedFruits([2], [1]), 1);
  assert.strictEqual(numOfUnplacedFruits([5, 5, 5], [5, 5, 4]), 1);
});

test('matches greedy brute force on random inputs', () => {
  for (let t = 0; t < 1000; t++) {
    const n = 1 + Math.floor(Math.random() * 20);
    const fr = Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 10));
    const bs = Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 10));
    assert.strictEqual(numOfUnplacedFruits(fr, bs), brute(fr, bs));
  }
});

test('max size timing', () => {
  const n = 100000;
  const fr = Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 1e9));
  const bs = Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 1e9));
  const start = Date.now();
  numOfUnplacedFruits(fr, bs);
  const inc = Array.from({ length: n }, (_, i) => i + 1);
  assert.strictEqual(numOfUnplacedFruits(inc.slice().reverse(), inc), 0);
  assert.ok(Date.now() - start < 1000);
});
