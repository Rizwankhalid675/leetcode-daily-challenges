const test = require('node:test');
const assert = require('node:assert');
const { threeSumClosest } = require('./solution');

function brute(nums, target) {
  let best = null;
  for (let i = 0; i < nums.length; i++)
    for (let j = i + 1; j < nums.length; j++)
      for (let k = j + 1; k < nums.length; k++) {
        const s = nums[i] + nums[j] + nums[k];
        if (best === null || Math.abs(s - target) < Math.abs(best - target)) best = s;
      }
  return best;
}

test('official examples', () => {
  assert.strictEqual(threeSumClosest([-1, 2, 1, -4], 1), 2);
  assert.strictEqual(threeSumClosest([0, 0, 0], 1), 0);
});

test('distance matches brute force (answer is unique per problem statement, so compare distance)', () => {
  for (let t = 0; t < 1500; t++) {
    const n = 3 + Math.floor(Math.random() * 8);
    const nums = Array.from({ length: n }, () => Math.floor(Math.random() * 41) - 20);
    const target = Math.floor(Math.random() * 121) - 60;
    const got = threeSumClosest(nums, target);
    assert.strictEqual(Math.abs(got - target), Math.abs(brute(nums, target) - target));
  }
});

test('does not mutate input', () => {
  const nums = [3, 1, 2];
  threeSumClosest(nums, 0);
  assert.deepStrictEqual(nums, [3, 1, 2]);
});
