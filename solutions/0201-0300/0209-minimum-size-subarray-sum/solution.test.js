const test = require('node:test');
const assert = require('node:assert');
const { minSubArrayLen } = require('./solution');

function brute(target, nums) {
  let best = 0;
  for (let i = 0; i < nums.length; i++) {
    let s = 0;
    for (let j = i; j < nums.length; j++) {
      s += nums[j];
      if (s >= target) {
        if (best === 0 || j - i + 1 < best) best = j - i + 1;
        break;
      }
    }
  }
  return best;
}

test('official examples', () => {
  assert.strictEqual(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]), 2);
  assert.strictEqual(minSubArrayLen(4, [1, 4, 4]), 1);
  assert.strictEqual(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1]), 0);
});

test('matches brute force', () => {
  for (let t = 0; t < 1000; t++) {
    const nums = Array.from({ length: 1 + Math.floor(Math.random() * 10) }, () => 1 + Math.floor(Math.random() * 5));
    const target = 1 + Math.floor(Math.random() * 25);
    assert.strictEqual(minSubArrayLen(target, nums), brute(target, nums), JSON.stringify([target, nums]));
  }
});
