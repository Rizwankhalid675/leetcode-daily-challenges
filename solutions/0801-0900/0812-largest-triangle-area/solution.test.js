const test = require('node:test');
const assert = require('node:assert');
const { largestTriangleArea } = require('./solution');

const rint = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));

function heron(a, b, c) {
  const d = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
  const x = d(a, b), y = d(b, c), z = d(c, a);
  const s = (x + y + z) / 2;
  return Math.sqrt(Math.max(0, s * (s - x) * (s - y) * (s - z)));
}

test('official examples', () => {
  assert.strictEqual(largestTriangleArea([[0, 0], [0, 1], [1, 0], [0, 2], [2, 0]]), 2);
  assert.strictEqual(largestTriangleArea([[1, 0], [0, 0], [0, 1]]), 0.5);
});

test('collinear points give 0; extreme corners', () => {
  assert.strictEqual(largestTriangleArea([[0, 0], [1, 1], [2, 2]]), 0);
  assert.strictEqual(largestTriangleArea([[-50, -50], [50, -50], [-50, 50], [0, 0]]), 5000);
});

test('matches Heron formula over all triples', () => {
  for (let t = 0; t < 300; t++) {
    const seen = new Set();
    const pts = [];
    const n = rint(3, 9);
    while (pts.length < n) {
      const p = [rint(-10, 10), rint(-10, 10)];
      if (!seen.has(p.join())) { seen.add(p.join()); pts.push(p); }
    }
    let want = 0;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) for (let k = j + 1; k < n; k++) want = Math.max(want, heron(pts[i], pts[j], pts[k]));
    assert.ok(Math.abs(largestTriangleArea(pts) - want) < 1e-6, JSON.stringify(pts));
  }
});
