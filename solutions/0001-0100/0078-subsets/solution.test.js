const test = require('node:test');
const assert = require('node:assert');
const { subsets } = require('./solution');

const norm = (ss) => ss.map((s) => [...s].sort((a, b) => a - b).join(',')).sort();

test('official examples', () => {
  assert.deepStrictEqual(norm(subsets([1, 2, 3])), norm([[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]));
  assert.deepStrictEqual(norm(subsets([0])), norm([[], [0]]));
});

test('2^n distinct subsets, each drawn from nums', () => {
  for (let n = 1; n <= 10; n++) {
    const pool = Array.from({ length: 21 }, (_, i) => i - 10).sort(() => Math.random() - 0.5);
    const nums = pool.slice(0, n);
    const res = subsets(nums);
    assert.strictEqual(res.length, 1 << n);
    assert.strictEqual(new Set(norm(res)).size, 1 << n);
    for (const s of res) {
      assert.strictEqual(new Set(s).size, s.length);
      for (const x of s) assert.ok(nums.includes(x));
    }
  }
});
