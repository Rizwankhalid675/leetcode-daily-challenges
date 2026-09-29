const test = require('node:test');
const assert = require('node:assert');
const { computeArea } = require('./solution');

const rint = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));

function brute(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
  let c = 0;
  for (let x = -12; x < 12; x++) for (let y = -12; y < 12; y++) {
    const inA = x >= ax1 && x < ax2 && y >= ay1 && y < ay2;
    const inB = x >= bx1 && x < bx2 && y >= by1 && y < by2;
    if (inA || inB) c++;
  }
  return c;
}

test('official examples', () => {
  assert.strictEqual(computeArea(-3, 0, 3, 4, 0, -1, 9, 2), 45);
  assert.strictEqual(computeArea(-2, -2, 2, 2, -2, -2, 2, 2), 16);
});

test('edge cases', () => {
  assert.strictEqual(computeArea(0, 0, 1, 1, 1, 0, 2, 1), 2); // touching edge
  assert.strictEqual(computeArea(0, 0, 0, 5, 0, 0, 3, 3), 9); // degenerate A
  assert.strictEqual(computeArea(-10000, -10000, 10000, 10000, -10000, -10000, 10000, 10000), 400000000);
  assert.strictEqual(computeArea(-10000, -10000, 0, 0, 0, 0, 10000, 10000), 200000000);
});

test('matches unit-cell counting', () => {
  for (let t = 0; t < 2000; t++) {
    const r = () => { const a = rint(-10, 10), b = rint(-10, 10); return [Math.min(a, b), Math.max(a, b)]; };
    const [ax1, ax2] = r(), [ay1, ay2] = r(), [bx1, bx2] = r(), [by1, by2] = r();
    assert.strictEqual(computeArea(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2), brute(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2));
  }
});
