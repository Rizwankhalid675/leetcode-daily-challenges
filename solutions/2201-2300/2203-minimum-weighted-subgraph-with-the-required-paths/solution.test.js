const test = require('node:test');
const assert = require('node:assert');
const { minimumWeight } = require('./solution');

const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
function floyd(n, edges, directed) {
  const D = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 0 : Infinity)));
  for (const [u, v, w] of edges) {
    if (w < D[u][v]) D[u][v] = w;
    if (!directed && w < D[v][u]) D[v][u] = w;
  }
  for (let k = 0; k < n; k++) for (let i = 0; i < n; i++) for (let j = 0; j < n; j++)
    if (D[i][k] + D[k][j] < D[i][j]) D[i][j] = D[i][k] + D[k][j];
  return D;
}
function brute(n, edges, s1, s2, d) {
  const D = floyd(n, edges, true);
  let best = Infinity;
  for (let v = 0; v < n; v++) best = Math.min(best, D[s1][v] + D[s2][v] + D[v][d]);
  return best === Infinity ? -1 : best;
}
// exhaustive oracle for tiny graphs: every edge subset
function exhaustive(n, edges, s1, s2, d) {
  let best = Infinity;
  const m = edges.length;
  for (let mask = 0; mask < 1 << m; mask++) {
    let w = 0;
    const adj = Array.from({ length: n }, () => []);
    for (let i = 0; i < m; i++) if (mask >> i & 1) { w += edges[i][2]; adj[edges[i][0]].push(edges[i][1]); }
    if (w >= best) continue;
    const reach = (s) => { const seen = new Set([s]); const st = [s]; while (st.length) { const u = st.pop(); for (const v of adj[u]) if (!seen.has(v)) { seen.add(v); st.push(v); } } return seen.has(d); };
    if (reach(s1) && reach(s2)) best = w;
  }
  return best === Infinity ? -1 : best;
}

test('official examples', () => {
  assert.strictEqual(minimumWeight(6, [[0, 2, 2], [0, 5, 6], [1, 0, 3], [1, 4, 5], [2, 1, 1], [2, 3, 3], [2, 3, 4], [3, 4, 2], [4, 5, 1]], 0, 1, 5), 9);
  assert.strictEqual(minimumWeight(3, [[0, 1, 1], [2, 1, 1]], 0, 1, 2), -1);
});

test('meeting point can be a source or dest itself', () => {
  // src2 lies on src1's path: 0 -> 1 -> 2
  assert.strictEqual(minimumWeight(3, [[0, 1, 4], [1, 2, 5]], 0, 1, 2), 9);
  // separate paths meet only at dest
  assert.strictEqual(minimumWeight(3, [[0, 2, 4], [1, 2, 5]], 0, 1, 2), 9);
});

test('matches every-edge-subset search on tiny graphs', () => {
  for (let t = 0; t < 300; t++) {
    const n = ri(3, 5);
    const edges = Array.from({ length: ri(0, 8) }, () => { const u = ri(0, n - 1); let v = ri(0, n - 2); if (v >= u) v++; return [u, v, ri(1, 9)]; });
    const perm = [...Array(n).keys()].sort(() => Math.random() - 0.5);
    assert.strictEqual(minimumWeight(n, edges, perm[0], perm[1], perm[2]), exhaustive(n, edges, perm[0], perm[1], perm[2]));
  }
});

test('matches Floyd-Warshall meeting-point formula on random graphs', () => {
  for (let t = 0; t < 300; t++) {
    const n = ri(3, 12);
    const edges = Array.from({ length: ri(0, 40) }, () => { const u = ri(0, n - 1); let v = ri(0, n - 2); if (v >= u) v++; return [u, v, ri(1, 100000)]; });
    const perm = [...Array(n).keys()].sort(() => Math.random() - 0.5);
    assert.strictEqual(minimumWeight(n, edges, perm[0], perm[1], perm[2]), brute(n, edges, perm[0], perm[1], perm[2]));
  }
});

test('large weights sum beyond 2^31 and max size runs fast', () => {
  const n = 100000;
  const edges = [];
  for (let i = 0; i + 1 < n - 1; i++) edges.push([i, i + 1, 100000]);
  edges.push([n - 1, 0, 100000]);
  // src1 = n-1, src2 = 0, dest = n-2: path n-1 -> 0 -> ... -> n-2
  const t0 = Date.now();
  assert.strictEqual(minimumWeight(n, edges, n - 1, 0, n - 2), 100000 * (n - 1));
  assert.ok(100000 * (n - 1) > 2 ** 31);
  assert.ok(Date.now() - t0 < 1000);
});
