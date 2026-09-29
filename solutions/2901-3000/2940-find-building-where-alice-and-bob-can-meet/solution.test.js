const test = require('node:test');
const assert = require('node:assert');
const { leftmostBuildingQueries } = require('./solution');

function brute(heights, queries) {
  return queries.map(([a, b]) => {
    for (let j = 0; j < heights.length; j++) {
      const okA = j === a || (a < j && heights[a] < heights[j]);
      const okB = j === b || (b < j && heights[b] < heights[j]);
      if (okA && okB) return j;
    }
    return -1;
  });
}

test('official examples', () => {
  assert.deepStrictEqual(leftmostBuildingQueries([6, 4, 8, 5, 2, 7], [[0, 1], [0, 3], [2, 4], [3, 4], [2, 2]]), [2, 5, -1, 5, 2]);
  assert.deepStrictEqual(leftmostBuildingQueries([5, 3, 8, 2, 6, 1, 4, 6], [[0, 7], [3, 5], [5, 2], [3, 0], [1, 6]]), [7, 6, -1, 4, 6]);
});

test('equal heights never meet by moving', () => {
  assert.deepStrictEqual(leftmostBuildingQueries([3, 3, 3], [[0, 1], [1, 0], [0, 2], [1, 1]]), [-1, -1, -1, 1]);
});

test('matches brute force on random inputs', () => {
  for (let t = 0; t < 500; t++) {
    const n = 1 + Math.floor(Math.random() * 12);
    const h = Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 6));
    const qs = Array.from({ length: 15 }, () => [Math.floor(Math.random() * n), Math.floor(Math.random() * n)]);
    assert.deepStrictEqual(leftmostBuildingQueries(h, qs), brute(h, qs));
  }
});

test('max size timing', () => {
  const n = 50000;
  const h = Array.from({ length: n }, (_, i) => n - i); // decreasing: every hard query must search
  const qs = Array.from({ length: 50000 }, (_, i) => [i % n, (i * 7919) % n]);
  const start = Date.now();
  const res = leftmostBuildingQueries(h, qs);
  assert.strictEqual(res.length, 50000);
  const h2 = Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 1e9));
  leftmostBuildingQueries(h2, qs);
  assert.ok(Date.now() - start < 1000);
});
