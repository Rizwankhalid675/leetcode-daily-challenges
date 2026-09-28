const test = require('node:test');
const assert = require('node:assert');
const { spiralOrder } = require('./solution');

// Reference: simulate a walker that turns right when blocked.
function walk(m) {
  const R = m.length, C = m[0].length;
  const seen = m.map((r) => r.map(() => false));
  const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  const out = [];
  let r = 0, c = 0, d = 0;
  for (let k = 0; k < R * C; k++) {
    out.push(m[r][c]);
    seen[r][c] = true;
    const [nr, nc] = [r + dirs[d][0], c + dirs[d][1]];
    if (nr < 0 || nr >= R || nc < 0 || nc >= C || seen[nr][nc]) d = (d + 1) % 4;
    r += dirs[d][0];
    c += dirs[d][1];
  }
  return out;
}

test('official examples', () => {
  assert.deepStrictEqual(spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), [1, 2, 3, 6, 9, 8, 7, 4, 5]);
  assert.deepStrictEqual(spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]), [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]);
});

test('all shapes up to 10x10 match the walker', () => {
  for (let R = 1; R <= 10; R++)
    for (let C = 1; C <= 10; C++) {
      const m = Array.from({ length: R }, (_, i) => Array.from({ length: C }, (_, j) => i * C + j));
      assert.deepStrictEqual(spiralOrder(m), walk(m), `${R}x${C}`);
    }
});
