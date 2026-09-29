const test = require('node:test');
const assert = require('node:assert');
const { maxProduct } = require('./solution');

function bruteForce(nums) {
  let best = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    let p = 1;
    for (let j = i; j < nums.length; j++) { p *= nums[j]; best = Math.max(best, p); }
  }
  return best + 0;
}

test('official examples', () => {
  assert.strictEqual(maxProduct([2, 3, -2, 4]), 6);
  assert.strictEqual(maxProduct([-2, 0, -1]), 0);
});

test('edge cases', () => {
  assert.strictEqual(maxProduct([-2]), -2);
  assert.strictEqual(maxProduct([0]), 0);
  assert.strictEqual(maxProduct([-2, 3, -4]), 24);
  assert.strictEqual(maxProduct([0, -2]), 0); // must be +0, not -0
  assert.ok(Object.is(maxProduct([-3, 0]), 0));
  assert.strictEqual(maxProduct([-1, -1, -1]), 1);
});

test('matches brute force on random arrays', () => {
  for (let t = 0; t < 2000; t++) {
    const nums = Array.from({ length: 1 + Math.floor(Math.random() * 8) }, () => Math.floor(Math.random() * 9) - 4);
    assert.strictEqual(maxProduct(nums), bruteForce(nums));
  }
});
