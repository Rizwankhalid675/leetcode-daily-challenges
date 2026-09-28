const test = require('node:test');
const assert = require('node:assert');
const { gameOfLife } = require('./solution');

const run = (b) => {
  const copy = b.map((r) => [...r]);
  gameOfLife(copy);
  return copy;
};
// Reference: compute the next generation into a separate board.
const reference = (b) =>
  b.map((row, r) =>
    row.map((v, c) => {
      let live = 0;
      for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) if ((dr || dc) && b[r + dr]?.[c + dc] === 1) live++;
      return (v === 1 && (live === 2 || live === 3)) || (v === 0 && live === 3) ? 1 : 0;
    }),
  );

test('official examples', () => {
  assert.deepStrictEqual(run([[0, 1, 0], [0, 0, 1], [1, 1, 1], [0, 0, 0]]), [[0, 0, 0], [1, 0, 1], [0, 1, 1], [0, 1, 0]]);
  assert.deepStrictEqual(run([[1, 1], [1, 0]]), [[1, 1], [1, 1]]);
});

test('matches out-of-place reference', () => {
  for (let t = 0; t < 500; t++) {
    const m = 1 + Math.floor(Math.random() * 6), n = 1 + Math.floor(Math.random() * 6);
    const b = Array.from({ length: m }, () => Array.from({ length: n }, () => (Math.random() < 0.4 ? 1 : 0)));
    assert.deepStrictEqual(run(b), reference(b), JSON.stringify(b));
  }
});
