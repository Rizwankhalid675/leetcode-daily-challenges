const test = require('node:test');
const assert = require('node:assert');
const { rob } = require('./solution');

// Reference: every subset with no two adjacent houses.
function brute(nums) {
  let best = 0;
  for (let mask = 0; mask < 1 << nums.length; mask++) {
    if (mask & (mask >> 1)) continue; // adjacent pair chosen
    let s = 0;
    for (let i = 0; i < nums.length; i++) if (mask & (1 << i)) s += nums[i];
    best = Math.max(best, s);
  }
  return best;
}

test('official examples', () => {
  assert.strictEqual(rob([1, 2, 3, 1]), 4);
  assert.strictEqual(rob([2, 7, 9, 3, 1]), 12);
});

test('edge cases', () => {
  assert.strictEqual(rob([5]), 5);
  assert.strictEqual(rob([0, 0, 0]), 0);
  assert.strictEqual(rob([2, 1, 1, 2]), 4); // skipping two in a row can be optimal
});

test('matches subset enumeration', () => {
  for (let t = 0; t < 500; t++) {
    const nums = Array.from({ length: 1 + Math.floor(Math.random() * 12) }, () => Math.floor(Math.random() * 20));
    assert.strictEqual(rob(nums), brute(nums), JSON.stringify(nums));
  }
});
