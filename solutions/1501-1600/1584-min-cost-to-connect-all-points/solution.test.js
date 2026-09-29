const test = require('node:test');
const assert = require('node:assert');
const { minCostConnectPoints } = require('./solution');

function kruskal(points) {
  const n = points.length;
  const edges = [];
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
    edges.push([Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]), i, j]);
  }
  edges.sort((a, b) => a[0] - b[0]);
  const p = Array.from({ length: n }, (_, i) => i);
  const f = (x) => (p[x] === x ? x : (p[x] = f(p[x])));
  let total = 0;
  for (const [w, a, b] of edges) {
    const ra = f(a);
    const rb = f(b);
    if (ra !== rb) { p[ra] = rb; total += w; }
  }
  return total;
}

test('official examples', () => {
  assert.strictEqual(minCostConnectPoints([[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]]), 20);
  assert.strictEqual(minCostConnectPoints([[3, 12], [-2, 5], [-4, 1]]), 18);
});

test('single point', () => {
  assert.strictEqual(minCostConnectPoints([[5, -5]]), 0);
});

test('matches Kruskal on random points', () => {
  for (let t = 0; t < 300; t++) {
    const seen = new Set();
    const pts = [];
    const n = 1 + Math.floor(Math.random() * 20);
    while (pts.length < n) {
      const x = Math.floor(Math.random() * 21) - 10;
      const y = Math.floor(Math.random() * 21) - 10;
      if (!seen.has(x + ',' + y)) { seen.add(x + ',' + y); pts.push([x, y]); }
    }
    assert.strictEqual(minCostConnectPoints(pts), kruskal(pts));
  }
});

test('max size timing', () => {
  const pts = Array.from({ length: 1000 }, (_, i) => [i * 2000 - 1e6, (i * 7919) % 2000001 - 1e6]);
  const start = Date.now();
  assert.strictEqual(minCostConnectPoints(pts), kruskal(pts));
  assert.ok(Date.now() - start < 2000);
});
