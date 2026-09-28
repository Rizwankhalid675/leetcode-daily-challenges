const test = require('node:test');
const assert = require('node:assert');
const { numTilings } = require('./solution');

// Independent check: count actual tilings by backtracking over cells of a 2 x n board.
// Always fill the first empty cell (column-major), trying every piece that covers it.
function countTilings(n) {
  const filled = [new Array(n).fill(false), new Array(n).fill(false)];
  // each shape is a list of [row, colOffset] cells, anchored so the first cell is the top-leftmost in column-major order
  // Shapes are translated so shape[0] lands on the first empty cell, so each distinct shape
  // must appear once (a "bottom-row" horizontal domino is the same shape as a "top-row" one).
  const shapes = [
    [[0, 0], [1, 0]], // vertical domino
    [[0, 0], [0, 1]], // horizontal domino
    [[0, 0], [1, 0], [0, 1]], // L trominoes in a 2x2 box (4 rotations)
    [[0, 0], [1, 0], [1, 1]],
    [[0, 0], [0, 1], [1, 1]],
    [[1, 0], [0, 1], [1, 1]],
  ];
  const rec = () => {
    let r = -1, c = -1;
    outer: for (let col = 0; col < n; col++) for (let row = 0; row < 2; row++) if (!filled[row][col]) { r = row; c = col; break outer; }
    if (r === -1) return 1;
    let ways = 0;
    for (const shape of shapes) {
      const [ar, ac] = shape[0];
      const cells = shape.map(([sr, sc]) => [r + sr - ar, c + sc - ac]);
      if (cells.every(([x, y]) => x >= 0 && x < 2 && y >= 0 && y < n && !filled[x][y])) {
        cells.forEach(([x, y]) => (filled[x][y] = true));
        ways += rec();
        cells.forEach(([x, y]) => (filled[x][y] = false));
      }
    }
    return ways;
  };
  return rec();
}

test('official examples', () => {
  assert.strictEqual(numTilings(3), 5);
  assert.strictEqual(numTilings(1), 1);
});

test('recurrence matches brute-force tiling counts for n = 1..10', () => {
  for (let n = 1; n <= 10; n++) assert.strictEqual(numTilings(n), countTilings(n), `n=${n}`);
});

test('large n stays an integer in range', () => {
  const v = numTilings(1000);
  assert.ok(Number.isInteger(v) && v >= 0 && v < 1_000_000_007);
});
