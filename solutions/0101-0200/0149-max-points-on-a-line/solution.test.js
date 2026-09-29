const test = require('node:test');
const assert = require('node:assert');
const { maxPoints } = require('./solution');

const rint = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));

function brute(pts) {
  const n = pts.length;
  if (n <= 2) return n;
  let best = 2;
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
    let c = 0;
    for (let k = 0; k < n; k++) {
      const cross = (pts[j][0] - pts[i][0]) * (pts[k][1] - pts[i][1]) - (pts[j][1] - pts[i][1]) * (pts[k][0] - pts[i][0]);
      if (cross === 0) c++;
    }
    best = Math.max(best, c);
  }
  return best;
}

function randomPoints(n, R) {
  const seen = new Set();
  const pts = [];
  while (pts.length < n) {
    const p = [rint(-R, R), rint(-R, R)];
    if (!seen.has(p.join())) { seen.add(p.join()); pts.push(p); }
  }
  return pts;
}

test('official examples', () => {
  assert.strictEqual(maxPoints([[1, 1], [2, 2], [3, 3]]), 3);
  assert.strictEqual(maxPoints([[1, 1], [3, 2], [5, 3], [4, 1], [2, 3], [1, 4]]), 4);
});

test('edge cases', () => {
  assert.strictEqual(maxPoints([[0, 0]]), 1);
  assert.strictEqual(maxPoints([[0, 0], [5, -3]]), 2);
  assert.strictEqual(maxPoints([[0, 0], [0, 5], [0, -7], [1, 1]]), 3); // vertical line, both directions
  assert.strictEqual(maxPoints([[0, 0], [4, 0], [-9, 0], [1, 1]]), 3); // horizontal line
  // nearly equal slopes that floating point could confuse
  assert.strictEqual(maxPoints([[0, 0], [9999, 10000], [10000, 10001], [-10000, -10000]]), 2);
  assert.strictEqual(maxPoints([[-10000, -10000], [10000, 10000], [0, 0], [3, 3], [9999, 9998]]), 4);
});

test('matches cross-product brute force on random sets', () => {
  for (let t = 0; t < 500; t++) {
    const pts = randomPoints(rint(1, 14), rint(2, 5));
    assert.strictEqual(maxPoints(pts), brute(pts), JSON.stringify(pts));
  }
});

test('max size runs fast', () => {
  const pts = randomPoints(300, 10000);
  const t0 = Date.now();
  assert.strictEqual(maxPoints(pts), brute(pts));
  assert.ok(Date.now() - t0 < 1000);
});
