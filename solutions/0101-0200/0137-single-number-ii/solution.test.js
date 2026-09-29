const test = require('node:test');
const assert = require('node:assert');
const { singleNumber } = require('./solution');

const rint = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));

function viaMap(nums) {
  const c = new Map();
  for (const x of nums) c.set(x, (c.get(x) || 0) + 1);
  for (const [k, v] of c) if (v === 1) return k;
}

test('official examples', () => {
  assert.strictEqual(singleNumber([2, 2, 3, 2]), 3);
  assert.strictEqual(singleNumber([0, 1, 0, 1, 0, 1, 99]), 99);
});

test('negatives and 32-bit extremes', () => {
  assert.strictEqual(singleNumber([-2, -2, 1, 1, 4, 1, 4, 4, -4, -2]), -4);
  assert.strictEqual(singleNumber([-2147483648, 5, 5, 5]), -2147483648);
  assert.strictEqual(singleNumber([2147483647, -2147483648, -2147483648, -2147483648]), 2147483647);
  assert.strictEqual(singleNumber([7]), 7);
});

test('matches counting on random shuffled inputs', () => {
  for (let t = 0; t < 500; t++) {
    const k = rint(0, 30);
    const vals = new Set();
    while (vals.size < k + 1) vals.add(Math.random() < 0.3 ? rint(-5, 5) : rint(-2147483648, 2147483647));
    const arr = [...vals];
    const nums = [arr[0]];
    for (const v of arr.slice(1)) nums.push(v, v, v);
    nums.sort(() => Math.random() - 0.5);
    assert.strictEqual(singleNumber(nums), viaMap(nums));
  }
});
