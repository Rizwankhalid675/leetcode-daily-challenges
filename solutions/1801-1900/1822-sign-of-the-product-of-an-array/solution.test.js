const test = require('node:test');
const assert = require('node:assert');
const { arraySign } = require('./solution');

function oracle(nums) {
  let p = 1n;
  for (const x of nums) p *= BigInt(x);
  return p === 0n ? 0 : p > 0n ? 1 : -1;
}

test('official examples', () => {
  assert.strictEqual(arraySign([-1, -2, -3, -4, 3, 2, 1]), 1);
  assert.strictEqual(arraySign([1, 5, 0, 2, -3]), 0);
  assert.strictEqual(arraySign([-1, 1, -1, 1, -1]), -1);
});

test('matches exact BigInt product, including products far beyond 2^53', () => {
  for (let t = 0; t < 500; t++) {
    const nums = Array.from({ length: 1 + Math.floor(Math.random() * 60) }, () => Math.floor(Math.random() * 201) - 100);
    assert.strictEqual(arraySign(nums), oracle(nums));
  }
  const big = new Array(1000).fill(-100);
  assert.strictEqual(arraySign(big), 1);
  big.push(-100);
  assert.strictEqual(arraySign(big), -1);
});
