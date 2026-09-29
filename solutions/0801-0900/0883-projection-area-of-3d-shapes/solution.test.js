const test = require('node:test');
const assert = require('node:assert');
const { projectionArea } = require('./solution');

const rint = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));

function brute(grid) {
  // literally paint the three shadows on 2D boolean boards
  const n = grid.length;
  const H = 51;
  const xy = new Set(), yz = new Set(), zx = new Set();
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) for (let z = 0; z < grid[i][j]; z++) {
    xy.add(i * H + j); yz.add(j * H + z); zx.add(z * H + i);
  }
  return xy.size + yz.size + zx.size;
}

test('official examples', () => {
  assert.strictEqual(projectionArea([[1, 2], [3, 4]]), 17);
  assert.strictEqual(projectionArea([[2]]), 5);
  assert.strictEqual(projectionArea([[1, 0], [0, 2]]), 8);
});

test('all zeros', () => {
  assert.strictEqual(projectionArea([[0, 0], [0, 0]]), 0);
});

test('matches cube-by-cube shadow painting', () => {
  for (let t = 0; t < 300; t++) {
    const n = rint(1, 5);
    const g = Array.from({ length: n }, () => Array.from({ length: n }, () => (Math.random() < 0.3 ? 0 : rint(0, 6))));
    assert.strictEqual(projectionArea(g), brute(g), JSON.stringify(g));
  }
});
