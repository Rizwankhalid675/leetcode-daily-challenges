const test = require('node:test');
const assert = require('node:assert');
const { singleNumber } = require('./solution');

test('official examples', () => {
  assert.strictEqual(singleNumber([2, 2, 1]), 1);
  assert.strictEqual(singleNumber([4, 1, 2, 1, 2]), 4);
  assert.strictEqual(singleNumber([1]), 1);
});

test('negative values and random shuffles', () => {
  assert.strictEqual(singleNumber([-30000, 5, 5]), -30000); // XOR works on 32-bit two's complement
  for (let t = 0; t < 500; t++) {
    const single = Math.floor(Math.random() * 60001) - 30000;
    const pairs = Array.from({ length: Math.floor(Math.random() * 10) }, () => Math.floor(Math.random() * 60001) - 30000).filter((v) => v !== single);
    const arr = [...pairs, ...pairs, single].sort(() => Math.random() - 0.5);
    assert.strictEqual(singleNumber(arr), single);
  }
});
