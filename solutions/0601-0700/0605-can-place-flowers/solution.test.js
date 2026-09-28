const test = require('node:test');
const assert = require('node:assert');
const { canPlaceFlowers } = require('./solution');

// Reference: maximum plantable count by trying every subset of empty plots (tiny inputs).
function maxPlantable(bed) {
  const empty = bed.map((v, i) => (v === 0 ? i : -1)).filter((i) => i >= 0);
  let best = 0;
  for (let mask = 0; mask < 1 << empty.length; mask++) {
    const b = [...bed];
    let count = 0;
    empty.forEach((i, k) => {
      if (mask & (1 << k)) (b[i] = 1), count++;
    });
    if (b.every((v, i) => !(v === 1 && b[i + 1] === 1))) best = Math.max(best, count);
  }
  return best;
}

test('official examples', () => {
  assert.strictEqual(canPlaceFlowers([1, 0, 0, 0, 1], 1), true);
  assert.strictEqual(canPlaceFlowers([1, 0, 0, 0, 1], 2), false);
});

test('edge cases', () => {
  assert.strictEqual(canPlaceFlowers([0], 1), true); // single empty plot, both ends open
  assert.strictEqual(canPlaceFlowers([1], 1), false);
  assert.strictEqual(canPlaceFlowers([0, 0], 1), true);
  assert.strictEqual(canPlaceFlowers([1, 0, 1], 0), true); // n = 0 is always possible
  const bed = [0, 0, 0];
  canPlaceFlowers(bed, 2);
  assert.deepStrictEqual(bed, [0, 0, 0]); // input not mutated
});

test('greedy matches exhaustive maximum', () => {
  for (let t = 0; t < 500; t++) {
    const bed = [];
    for (let i = 0; i < 1 + Math.floor(Math.random() * 12); i++) bed.push(bed[i - 1] === 1 ? 0 : Math.random() < 0.3 ? 1 : 0);
    const max = maxPlantable(bed);
    assert.strictEqual(canPlaceFlowers(bed, max), true, JSON.stringify(bed));
    assert.strictEqual(canPlaceFlowers(bed, max + 1), false, JSON.stringify(bed));
  }
});
