const test = require('node:test');
const assert = require('node:assert');
const { threeSum } = require('./solution');

const norm = (res) => res.map((t) => [...t].sort((a, b) => a - b).join(',')).sort();

function brute(nums) {
  const out = new Set();
  for (let i = 0; i < nums.length; i++)
    for (let j = i + 1; j < nums.length; j++)
      for (let k = j + 1; k < nums.length; k++)
        if (nums[i] + nums[j] + nums[k] === 0) out.add([nums[i], nums[j], nums[k]].sort((a, b) => a - b).join(','));
  return [...out].sort();
}

test('official examples', () => {
  assert.deepStrictEqual(norm(threeSum([-1, 0, 1, 2, -1, -4])), ['-1,-1,2', '-1,0,1']);
  assert.deepStrictEqual(threeSum([0, 1, 1]), []);
  assert.deepStrictEqual(norm(threeSum([0, 0, 0])), ['0,0,0']);
});

test('matches brute force with duplicates everywhere', () => {
  for (let t = 0; t < 1000; t++) {
    const nums = Array.from({ length: 3 + Math.floor(Math.random() * 10) }, () => Math.floor(Math.random() * 9) - 4);
    assert.deepStrictEqual(norm(threeSum(nums)), brute(nums), JSON.stringify(nums));
  }
});
