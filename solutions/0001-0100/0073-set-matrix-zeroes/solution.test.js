const test = require('node:test');
const assert = require('node:assert');
const { setZeroes } = require('./solution');

const run = (m) => {
  const copy = m.map((r) => [...r]);
  setZeroes(copy);
  return copy;
};
const reference = (m) => {
  const rows = new Set(), cols = new Set();
  m.forEach((row, r) => row.forEach((v, c) => v === 0 && (rows.add(r), cols.add(c))));
  return m.map((row, r) => row.map((v, c) => (rows.has(r) || cols.has(c) ? 0 : v)));
};

test('official examples', () => {
  assert.deepStrictEqual(run([[1, 1, 1], [1, 0, 1], [1, 1, 1]]), [[1, 0, 1], [0, 0, 0], [1, 0, 1]]);
  assert.deepStrictEqual(run([[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]), [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]]);
});

test('zeros in the first row/column and random matrices', () => {
  assert.deepStrictEqual(run([[1, 0], [1, 1]]), [[0, 0], [1, 0]]);
  assert.deepStrictEqual(run([[1, 1], [0, 1]]), [[0, 1], [0, 0]]);
  for (let t = 0; t < 1000; t++) {
    const m = Array.from({ length: 1 + Math.floor(Math.random() * 5) }, () => Array.from({ length: 1 + Math.floor(Math.random() * 5) }, () => (Math.random() < 0.2 ? 0 : 1 + Math.floor(Math.random() * 3))));
    const width = m[0].length;
    m.forEach((r) => (r.length = width));
    for (const r of m) for (let c = 0; c < width; c++) if (r[c] === undefined) r[c] = 1;
    assert.deepStrictEqual(run(m), reference(m), JSON.stringify(m));
  }
});
