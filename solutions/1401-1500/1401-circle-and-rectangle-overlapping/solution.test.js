const test = require('node:test');
const assert = require('node:assert');
const { checkOverlap } = require('./solution');

// Reference: sample a fine grid of rectangle points (quarter-unit steps) and test each one.
// With integer inputs the closest point is always a grid point, so this is exact.
function brute(r, xc, yc, x1, y1, x2, y2) {
  for (let x = x1; x <= x2; x += 0.25)
    for (let y = y1; y <= y2; y += 0.25) if ((x - xc) ** 2 + (y - yc) ** 2 <= r * r) return true;
  return false;
}

test('official examples', () => {
  assert.strictEqual(checkOverlap(1, 0, 0, 1, -1, 3, 1), true);
  assert.strictEqual(checkOverlap(1, 1, 1, 1, -3, 2, -1), false);
  assert.strictEqual(checkOverlap(1, 0, 0, -1, 0, 0, 1), true);
});

test('edge cases', () => {
  assert.strictEqual(checkOverlap(1, 0, 0, 1, 0, 2, 1), true); // touches at exactly one point
  assert.strictEqual(checkOverlap(1, 0, 0, 1, 1, 2, 2), false); // corner at distance sqrt(2) > 1
  assert.strictEqual(checkOverlap(2, 0, 0, 1, 1, 2, 2), true); // corner at distance sqrt(2) < 2
  assert.strictEqual(checkOverlap(1, 5, 5, 0, 0, 10, 10), true); // circle fully inside
  assert.strictEqual(checkOverlap(2000, 0, 0, -10000, -10000, 10000, 10000), true); // rectangle contains circle
});

test('matches point-sampling reference on random inputs', () => {
  const rnd = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
  for (let t = 0; t < 1000; t++) {
    const x1 = rnd(-5, 4), y1 = rnd(-5, 4);
    const x2 = rnd(x1 + 1, 6), y2 = rnd(y1 + 1, 6);
    const args = [rnd(1, 4), rnd(-7, 7), rnd(-7, 7), x1, y1, x2, y2];
    assert.strictEqual(checkOverlap(...args), brute(...args), JSON.stringify(args));
  }
});
