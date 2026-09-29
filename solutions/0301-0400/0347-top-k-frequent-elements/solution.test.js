const test = require('node:test');
const assert = require('node:assert');
const { topKFrequent } = require('./solution');

const sorted = (a) => [...a].sort((x, y) => x - y);
function oracle(nums, k) {
  const cnt = new Map();
  for (const x of nums) cnt.set(x, (cnt.get(x) || 0) + 1);
  return [...cnt.entries()].sort((a, b) => b[1] - a[1]).slice(0, k).map((e) => e[0]);
}
function uniqueAnswer(nums, k) {
  const cnt = new Map();
  for (const x of nums) cnt.set(x, (cnt.get(x) || 0) + 1);
  const f = [...cnt.values()].sort((a, b) => b - a);
  return k === f.length || f[k - 1] > f[k];
}

test('official examples', () => {
  assert.deepStrictEqual(sorted(topKFrequent([1, 1, 1, 2, 2, 3], 2)), [1, 2]);
  assert.deepStrictEqual(topKFrequent([1], 1), [1]);
  assert.deepStrictEqual(sorted(topKFrequent([1, 2, 1, 2, 1, 2, 3, 1, 3, 2], 2)), [1, 2]);
});

test('negative values and k = number of distinct values', () => {
  assert.deepStrictEqual(sorted(topKFrequent([-1, -1, 0, 5], 3)), [-1, 0, 5]);
});

test('matches sort-by-frequency oracle when the answer is unique', () => {
  let checked = 0;
  while (checked < 500) {
    const nums = Array.from({ length: 1 + Math.floor(Math.random() * 20) }, () => Math.floor(Math.random() * 9) - 4);
    const distinct = new Set(nums).size;
    const k = 1 + Math.floor(Math.random() * distinct);
    if (!uniqueAnswer(nums, k)) continue;
    assert.deepStrictEqual(sorted(topKFrequent(nums, k)), sorted(oracle(nums, k)));
    checked++;
  }
});

test('max size runs fast', () => {
  const nums = Array.from({ length: 1e5 }, (_, i) => (i % 20001) - 10000);
  const t0 = Date.now();
  topKFrequent(nums, 5);
  assert.ok(Date.now() - t0 < 500);
});
