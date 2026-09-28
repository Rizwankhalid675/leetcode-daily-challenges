const test = require('node:test');
const assert = require('node:assert');
const { isRectangleOverlap } = require('./solution');

// Reference on small integer grids: count unit squares covered by both rectangles.
function brute(a, b) {
  for (let x = -6; x < 6; x++)
    for (let y = -6; y < 6; y++) {
      const inA = x >= a[0] && x + 1 <= a[2] && y >= a[1] && y + 1 <= a[3];
      const inB = x >= b[0] && x + 1 <= b[2] && y >= b[1] && y + 1 <= b[3];
      if (inA && inB) return true;
    }
  return false;
}

test('official examples', () => {
  assert.strictEqual(isRectangleOverlap([0, 0, 2, 2], [1, 1, 3, 3]), true);
  assert.strictEqual(isRectangleOverlap([0, 0, 1, 1], [1, 0, 2, 1]), false);
  assert.strictEqual(isRectangleOverlap([0, 0, 1, 1], [2, 2, 3, 3]), false);
});

test('edge cases', () => {
  assert.strictEqual(isRectangleOverlap([0, 0, 1, 1], [1, 1, 2, 2]), false); // corner touch
  assert.strictEqual(isRectangleOverlap([0, 0, 10, 10], [2, 2, 3, 3]), true); // containment
  assert.strictEqual(isRectangleOverlap([0, 0, 10, 1], [5, -5, 6, 5]), true); // cross shape
  assert.strictEqual(isRectangleOverlap([-1e9, -1e9, 1e9, 1e9], [0, 0, 1, 1]), true);
});

test('matches unit-square reference on random integer rectangles', () => {
  const rand = () => -5 + Math.floor(Math.random() * 10);
  for (let t = 0; t < 2000; t++) {
    const mk = () => {
      const x1 = rand(), y1 = rand();
      return [x1, y1, x1 + 1 + Math.floor(Math.random() * 4), y1 + 1 + Math.floor(Math.random() * 4)];
    };
    const a = mk(), b = mk();
    assert.strictEqual(isRectangleOverlap(a, b), brute(a, b), JSON.stringify([a, b]));
  }
});
