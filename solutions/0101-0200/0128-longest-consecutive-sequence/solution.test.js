const test = require('node:test');
const assert = require('node:assert');
const { longestConsecutive } = require('./solution');

function bySort(nums) {
  const a = [...new Set(nums)].sort((x, y) => x - y);
  let best = a.length ? 1 : 0;
  let run = 1;
  for (let i = 1; i < a.length; i++) {
    run = a[i] === a[i - 1] + 1 ? run + 1 : 1;
    best = Math.max(best, run);
  }
  return best;
}

test('official examples', () => {
  assert.strictEqual(longestConsecutive([100, 4, 200, 1, 3, 2]), 4);
  assert.strictEqual(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]), 9);
  assert.strictEqual(longestConsecutive([1, 0, 1, 2]), 3);
});

test('empty, negatives, and random vs sort-based reference', () => {
  assert.strictEqual(longestConsecutive([]), 0);
  assert.strictEqual(longestConsecutive([-1, -2, 0]), 3);
  for (let t = 0; t < 1000; t++) {
    const nums = Array.from({ length: Math.floor(Math.random() * 15) }, () => Math.floor(Math.random() * 20) - 10);
    assert.strictEqual(longestConsecutive(nums), bySort(nums), JSON.stringify(nums));
  }
});

test('1e5 consecutive values run in linear time', () => {
  const nums = Array.from({ length: 1e5 }, (_, i) => 1e5 - i);
  const t0 = Date.now();
  assert.strictEqual(longestConsecutive(nums), 1e5);
  assert.ok(Date.now() - t0 < 1000);
});
