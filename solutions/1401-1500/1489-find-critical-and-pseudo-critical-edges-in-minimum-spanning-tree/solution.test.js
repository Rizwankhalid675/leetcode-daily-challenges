const test = require('node:test');
const assert = require('node:assert');
const { findCriticalAndPseudoCriticalEdges } = require('./solution');

function brute(n, edges) {
  // enumerate every subset of n-1 edges that spans
  const m = edges.length;
  const trees = [];
  for (let mask = 0; mask < 1 << m; mask++) {
    let bits = 0;
    for (let i = 0; i < m; i++) if (mask >> i & 1) bits++;
    if (bits !== n - 1) continue;
    const p = Array.from({ length: n }, (_, i) => i);
    const f = (x) => (p[x] === x ? x : (p[x] = f(p[x])));
    let ok = true;
    let w = 0;
    for (let i = 0; i < m; i++) if (mask >> i & 1) {
      const ra = f(edges[i][0]);
      const rb = f(edges[i][1]);
      if (ra === rb) { ok = false; break; }
      p[ra] = rb;
      w += edges[i][2];
    }
    if (ok) trees.push([mask, w]);
  }
  const best = Math.min(...trees.map((t) => t[1]));
  const msts = trees.filter((t) => t[1] === best).map((t) => t[0]);
  const critical = [];
  const pseudo = [];
  for (let i = 0; i < m; i++) {
    const cnt = msts.filter((mask) => mask >> i & 1).length;
    if (cnt === msts.length) critical.push(i);
    else if (cnt > 0) pseudo.push(i);
  }
  return [critical, pseudo];
}

const norm = ([a, b]) => [[...a].sort((x, y) => x - y), [...b].sort((x, y) => x - y)];

test('official examples', () => {
  assert.deepStrictEqual(norm(findCriticalAndPseudoCriticalEdges(5, [[0, 1, 1], [1, 2, 1], [2, 3, 2], [0, 3, 2], [0, 4, 3], [3, 4, 3], [1, 4, 6]])), [[0, 1], [2, 3, 4, 5]]);
  assert.deepStrictEqual(norm(findCriticalAndPseudoCriticalEdges(4, [[0, 1, 1], [1, 2, 1], [2, 3, 1], [0, 3, 1]])), [[], [0, 1, 2, 3]]);
});

test('bridges are critical', () => {
  assert.deepStrictEqual(norm(findCriticalAndPseudoCriticalEdges(2, [[0, 1, 5]])), [[0], []]);
});

test('matches enumeration of all spanning trees', () => {
  for (let t = 0; t < 300; t++) {
    const n = 2 + Math.floor(Math.random() * 4);
    const pairs = [];
    for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) pairs.push([a, b]);
    // random spanning tree first, then extra edges
    const chosen = new Set();
    for (let v = 1; v < n; v++) { const u = Math.floor(Math.random() * v); chosen.add(u * 10 + v); }
    for (const [a, b] of pairs) if (Math.random() < 0.5) chosen.add(a * 10 + b);
    const edges = [...chosen].map((k) => [Math.floor(k / 10), k % 10, 1 + Math.floor(Math.random() * 3)]);
    assert.deepStrictEqual(norm(findCriticalAndPseudoCriticalEdges(n, edges)), brute(n, edges));
  }
});

test('max size timing', () => {
  const n = 100;
  const edges = [];
  for (let a = 0; a < n && edges.length < 200; a++) for (let b = a + 1; b < n && edges.length < 200; b++) edges.push([a, b, 1 + ((a * 31 + b * 17) % 5)]);
  for (let v = 1; v < n; v++) if (!edges.some(([a, b]) => b === v)) edges.push([0, v, 1000]);
  const start = Date.now();
  findCriticalAndPseudoCriticalEdges(n, edges.slice(0, 200));
  assert.ok(Date.now() - start < 1000);
});
