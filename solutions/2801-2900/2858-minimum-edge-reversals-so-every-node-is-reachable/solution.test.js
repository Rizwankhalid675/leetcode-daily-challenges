const test = require('node:test');
const assert = require('node:assert');
const { minEdgeReversals } = require('./solution');

function brute(n, edges) {
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) { adj[u].push([v, 0]); adj[v].push([u, 1]); }
  const res = [];
  for (let r = 0; r < n; r++) {
    const seen = new Array(n).fill(false);
    seen[r] = true;
    const st = [r];
    let c = 0;
    while (st.length) {
      const u = st.pop();
      for (const [v, w] of adj[u]) if (!seen[v]) { seen[v] = true; c += w; st.push(v); }
    }
    res.push(c);
  }
  return res;
}
function randomTree(n) {
  const edges = [];
  for (let i = 1; i < n; i++) {
    const p = Math.floor(Math.random() * i);
    edges.push(Math.random() < 0.5 ? [p, i] : [i, p]);
  }
  // relabel randomly so node 0 is not always the structural root
  const perm = Array.from({ length: n }, (_, i) => i).sort(() => Math.random() - 0.5);
  return edges.map(([u, v]) => [perm[u], perm[v]]);
}

test('official examples', () => {
  assert.deepStrictEqual(minEdgeReversals(4, [[2, 0], [2, 1], [1, 3]]), [1, 1, 0, 2]);
  assert.deepStrictEqual(minEdgeReversals(3, [[1, 2], [2, 0]]), [2, 0, 1]);
});

test('matches per-root DFS on random trees', () => {
  for (let t = 0; t < 500; t++) {
    const n = 2 + Math.floor(Math.random() * 12);
    const edges = randomTree(n);
    assert.deepStrictEqual(minEdgeReversals(n, edges), brute(n, edges));
  }
});

test('max size path (deep) and star run fast', () => {
  const n = 1e5;
  const path = Array.from({ length: n - 1 }, (_, i) => [i, i + 1]);
  const star = Array.from({ length: n - 1 }, (_, i) => [i + 1, 0]);
  const t0 = Date.now();
  const a = minEdgeReversals(n, path);
  assert.strictEqual(a[0], 0);
  assert.strictEqual(a[n - 1], n - 1);
  const b = minEdgeReversals(n, star);
  assert.strictEqual(b[0], n - 1);
  assert.strictEqual(b[5], n - 2);
  assert.ok(Date.now() - t0 < 1000);
});
