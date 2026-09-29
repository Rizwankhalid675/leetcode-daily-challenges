const test = require('node:test');
const assert = require('node:assert');
const { maximalSquare } = require('./solution');

function brute(mat) {
  const R = mat.length;
  const C = mat[0].length;
  let best = 0;
  for (let i = 0; i < R; i++)
    for (let j = 0; j < C; j++)
      for (let s = 1; i + s <= R && j + s <= C; s++) {
        let ok = true;
        for (let a = i; a < i + s && ok; a++)
          for (let b = j; b < j + s; b++)
            if (mat[a][b] !== '1') {
              ok = false;
              break;
            }
        if (ok) best = Math.max(best, s * s);
      }
  return best;
}

test('official examples', () => {
  assert.strictEqual(maximalSquare([['1', '0', '1', '0', '0'], ['1', '0', '1', '1', '1'], ['1', '1', '1', '1', '1'], ['1', '0', '0', '1', '0']]), 4);
  assert.strictEqual(maximalSquare([['0', '1'], ['1', '0']]), 1);
  assert.strictEqual(maximalSquare([['0']]), 0);
});

test('matches brute force on random grids', () => {
  for (let t = 0; t < 1500; t++) {
    const R = 1 + Math.floor(Math.random() * 6);
    const C = 1 + Math.floor(Math.random() * 6);
    const p = 0.5 + Math.random() * 0.45;
    const m = Array.from({ length: R }, () => Array.from({ length: C }, () => (Math.random() < p ? '1' : '0')));
    assert.strictEqual(maximalSquare(m), brute(m), JSON.stringify(m));
  }
});

test('max size all ones', () => {
  const m = Array.from({ length: 300 }, () => new Array(300).fill('1'));
  assert.strictEqual(maximalSquare(m), 90000);
});
