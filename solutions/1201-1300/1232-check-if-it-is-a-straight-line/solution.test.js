const test = require('node:test');
const assert = require('node:assert');
const { checkStraightLine } = require('./solution');

test('official examples', () => {
  assert.strictEqual(checkStraightLine([[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]]), true);
  assert.strictEqual(checkStraightLine([[1, 1], [2, 2], [3, 4], [4, 5], [5, 6], [7, 7]]), false);
});

test('vertical, horizontal, two points', () => {
  assert.strictEqual(checkStraightLine([[0, 0], [0, 1], [0, -1]]), true);
  assert.strictEqual(checkStraightLine([[1, 5], [3, 5], [-2, 5]]), true);
  assert.strictEqual(checkStraightLine([[1, 5], [3, 7]]), true);
  assert.strictEqual(checkStraightLine([[0, 0], [0, 1], [1, 1]]), false);
});

test('random points on a line, then perturbed', () => {
  for (let t = 0; t < 500; t++) {
    const a = Math.floor(Math.random() * 7) - 3, b = Math.floor(Math.random() * 7) - 3;
    if (a === 0 && b === 0) continue;
    const ks = [...new Set(Array.from({ length: 6 }, () => Math.floor(Math.random() * 2001) - 1000))];
    if (ks.length < 2) continue;
    const pts = ks.map((k) => [10 + a * k, -7 + b * k]);
    assert.strictEqual(checkStraightLine(pts), true);
    if (pts.length >= 3) {
      const i = 2 + Math.floor(Math.random() * (pts.length - 2));
      pts[i] = [pts[i][0] + (a === 0 ? 1 : 0), pts[i][1] + (a === 0 ? 0 : 1)];
      assert.strictEqual(checkStraightLine(pts), false);
    }
  }
});
