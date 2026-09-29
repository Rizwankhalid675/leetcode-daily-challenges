const test = require('node:test');
const assert = require('node:assert');
const { maximalPathQuality } = require('./solution');

const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
// independent oracle: BFS over states (node, visited-mask, time)
function brute(values, edges, maxTime) {
  const n = values.length;
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v, t] of edges) { adj[u].push([v, t]); adj[v].push([u, t]); }
  const seen = new Set();
  const key = (u, m, t) => u + '|' + m + '|' + t;
  const q = [[0, 1, 0]];
  seen.add(key(0, 1, 0));
  let best = 0;
  while (q.length) {
    const [u, m, t] = q.pop();
    if (u === 0) {
      let s = 0;
      for (let i = 0; i < n; i++) if (m >> i & 1) s += values[i];
      best = Math.max(best, s);
    }
    for (const [v, w] of adj[u]) {
      if (t + w > maxTime) continue;
      const k = key(v, m | (1 << v), t + w);
      if (!seen.has(k)) { seen.add(k); q.push([v, m | (1 << v), t + w]); }
    }
  }
  return best;
}

test('official examples', () => {
  assert.strictEqual(maximalPathQuality([0, 32, 10, 43], [[0, 1, 10], [1, 2, 15], [0, 3, 10]], 49), 75);
  assert.strictEqual(maximalPathQuality([5, 10, 15, 20], [[0, 1, 10], [1, 2, 10], [0, 3, 10]], 30), 25);
  assert.strictEqual(maximalPathQuality([1, 2, 3, 4], [[0, 1, 10], [1, 2, 11], [2, 3, 12], [1, 3, 13]], 50), 7);
});

test('no edges: only node 0 counts', () => {
  assert.strictEqual(maximalPathQuality([7], [], 10), 7);
  assert.strictEqual(maximalPathQuality([7, 100], [], 100), 7);
});

test('matches state-space BFS on random graphs', () => {
  for (let t = 0; t < 300; t++) {
    const n = ri(1, 7);
    const values = Array.from({ length: n }, () => ri(0, 50));
    const deg = new Array(n).fill(0);
    const edges = [];
    for (let u = 0; u < n; u++) for (let v = u + 1; v < n; v++)
      if (Math.random() < 0.5 && deg[u] < 4 && deg[v] < 4) { edges.push([u, v, ri(10, 30)]); deg[u]++; deg[v]++; }
    const maxTime = ri(10, 100);
    assert.strictEqual(maximalPathQuality(values, edges, maxTime), brute(values, edges, maxTime));
  }
});

test('worst case (degree 4, all times 10, maxTime 100) runs fast', () => {
  const n = 1000;
  const edges = [];
  // 4-regular circulant graph: i ~ i+1, i ~ i+2
  for (let i = 0; i < n; i++) { edges.push([i, (i + 1) % n, 10]); edges.push([i, (i + 2) % n, 10]); }
  const norm = edges.map(([u, v, t]) => (u < v ? [u, v, t] : [v, u, t]));
  const values = Array.from({ length: n }, (_, i) => 1e8 - i);
  const t0 = Date.now();
  maximalPathQuality(values, norm, 100);
  assert.ok(Date.now() - t0 < 1000);
});
