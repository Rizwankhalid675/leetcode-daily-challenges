const test = require('node:test');
const assert = require('node:assert');
const { networkDelayTime } = require('./solution');

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
function brute(times, n, k) {
  const D = floyd(n + 1, times, true);
  let ans = 0;
  for (let v = 1; v <= n; v++) ans = Math.max(ans, D[k][v]);
  return ans === Infinity ? -1 : ans;
}

test('official examples', () => {
  assert.strictEqual(networkDelayTime([[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 2), 2);
  assert.strictEqual(networkDelayTime([[1, 2, 1]], 2, 1), 1);
  assert.strictEqual(networkDelayTime([[1, 2, 1]], 2, 2), -1);
});

test('zero-weight edges and single node', () => {
  assert.strictEqual(networkDelayTime([[1, 2, 0], [2, 3, 0]], 3, 1), 0);
  assert.strictEqual(networkDelayTime([], 1, 1), 0);
});

test('matches Floyd-Warshall on random digraphs', () => {
  for (let t = 0; t < 500; t++) {
    const n = ri(1, 9);
    const times = [];
    for (let u = 1; u <= n; u++) for (let v = 1; v <= n; v++) if (u !== v && Math.random() < 0.3) times.push([u, v, ri(0, 100)]);
    const k = ri(1, n);
    assert.strictEqual(networkDelayTime(times, n, k), brute(times, n, k));
  }
});
