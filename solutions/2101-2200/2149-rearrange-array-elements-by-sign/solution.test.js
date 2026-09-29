const test = require('node:test');
const assert = require('node:assert');
const { rearrangeArray } = require('./solution');

function oracle(nums) {
  const p = nums.filter((x) => x > 0), q = nums.filter((x) => x < 0);
  return p.flatMap((x, i) => [x, q[i]]);
}
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

test('official examples', () => {
  assert.deepStrictEqual(rearrangeArray([3, 1, -2, -5, 2, -4]), [3, -2, 1, -5, 2, -4]);
  assert.deepStrictEqual(rearrangeArray([-1, 1]), [1, -1]);
});

test('matches filter-and-interleave oracle', () => {
  for (let t = 0; t < 500; t++) {
    const h = 1 + Math.floor(Math.random() * 8);
    const nums = shuffle([...Array.from({ length: h }, () => 1 + Math.floor(Math.random() * 9)), ...Array.from({ length: h }, () => -1 - Math.floor(Math.random() * 9))]);
    assert.deepStrictEqual(rearrangeArray(nums), oracle(nums));
  }
});

test('max size runs fast', () => {
  const nums = Array.from({ length: 2e5 }, (_, i) => (i < 1e5 ? -(i + 1) : i - 1e5 + 1));
  const t0 = Date.now();
  const r = rearrangeArray(nums);
  assert.strictEqual(r[0], 1);
  assert.strictEqual(r[1], -1);
  assert.ok(Date.now() - t0 < 500);
});
