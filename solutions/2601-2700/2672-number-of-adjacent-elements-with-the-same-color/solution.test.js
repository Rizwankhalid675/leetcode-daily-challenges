const test = require('node:test');
const assert = require('node:assert');
const { colorTheArray } = require('./solution');

// Oracle: apply each query and recount every adjacent pair.
function bruteForce(n, queries) {
  const a = new Array(n).fill(0);
  return queries.map(([i, c]) => {
    a[i] = c;
    let k = 0;
    for (let j = 0; j + 1 < n; j++) if (a[j] !== 0 && a[j] === a[j + 1]) k++;
    return k;
  });
}

test('official examples', () => {
  assert.deepStrictEqual(colorTheArray(4, [[0, 2], [1, 2], [3, 1], [1, 1], [2, 1]]), [0, 1, 1, 0, 2]);
  assert.deepStrictEqual(colorTheArray(1, [[0, 100000]]), [0]);
});

test('recolouring with the same colour does not double count', () => {
  assert.deepStrictEqual(colorTheArray(2, [[0, 5], [1, 5], [1, 5], [0, 5]]), [0, 1, 1, 1]);
});

test('matches recount on random queries', () => {
  for (let t = 0; t < 1000; t++) {
    const n = 1 + Math.floor(Math.random() * 7);
    const qs = Array.from({ length: 1 + Math.floor(Math.random() * 12) }, () =>
      [Math.floor(Math.random() * n), 1 + Math.floor(Math.random() * 3)]);
    assert.deepStrictEqual(colorTheArray(n, qs), bruteForce(n, qs));
  }
});

test('1e5 queries on 1e5 cells finish quickly', () => {
  const n = 100000;
  const qs = Array.from({ length: n }, () => [Math.floor(Math.random() * n), 1 + Math.floor(Math.random() * 2)]);
  const t0 = Date.now();
  colorTheArray(n, qs);
  assert.ok(Date.now() - t0 < 1000);
});
