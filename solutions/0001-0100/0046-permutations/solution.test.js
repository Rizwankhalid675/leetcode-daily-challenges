const test = require('node:test');
const assert = require('node:assert');
const { permute } = require('./solution');

const key = (res) => res.map((p) => p.join(',')).sort();
const fact = (n) => (n <= 1 ? 1 : n * fact(n - 1));

test('official examples', () => {
  assert.deepStrictEqual(key(permute([1, 2, 3])), key([[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]));
  assert.deepStrictEqual(key(permute([0, 1])), key([[0, 1], [1, 0]]));
  assert.deepStrictEqual(permute([1]), [[1]]);
});

test('n! distinct permutations, each a rearrangement of nums', () => {
  for (let n = 1; n <= 6; n++) {
    const nums = [];
    while (nums.length < n) { const v = -10 + Math.floor(Math.random() * 21); if (!nums.includes(v)) nums.push(v); }
    const res = permute(nums);
    assert.strictEqual(res.length, fact(n));
    assert.strictEqual(new Set(res.map((p) => p.join(','))).size, fact(n));
    const target = [...nums].sort((a, b) => a - b).join(',');
    for (const p of res) assert.strictEqual([...p].sort((a, b) => a - b).join(','), target);
  }
});
