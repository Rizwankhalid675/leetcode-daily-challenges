const test = require('node:test');
const assert = require('node:assert');
const { longestSubarray } = require('./solution');

// Reference: literally delete each index and measure the longest run of ones.
function brute(nums) {
  let best = 0;
  for (let d = 0; d < nums.length; d++) {
    const a = nums.filter((_, i) => i !== d);
    let run = 0;
    for (const x of a) {
      run = x === 1 ? run + 1 : 0;
      best = Math.max(best, run);
    }
  }
  return best;
}

test('official examples', () => {
  assert.strictEqual(longestSubarray([1, 1, 0, 1]), 3);
  assert.strictEqual(longestSubarray([0, 1, 1, 1, 0, 1, 1, 0, 1]), 5);
  assert.strictEqual(longestSubarray([1, 1, 1]), 2); // deletion is mandatory
});

test('edge cases', () => {
  assert.strictEqual(longestSubarray([0]), 0);
  assert.strictEqual(longestSubarray([1]), 0);
  assert.strictEqual(longestSubarray([0, 0, 0]), 0);
});

test('matches brute force', () => {
  for (let t = 0; t < 1000; t++) {
    const nums = Array.from({ length: 1 + Math.floor(Math.random() * 12) }, () => (Math.random() < 0.35 ? 0 : 1));
    assert.strictEqual(longestSubarray(nums), brute(nums), JSON.stringify(nums));
  }
});
