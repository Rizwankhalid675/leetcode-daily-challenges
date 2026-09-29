const test = require('node:test');
const assert = require('node:assert');
const { Graph } = require('./solution');

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

test('official example', () => {
  const g = new Graph(4, [[0, 2, 5], [0, 1, 2], [1, 2, 1], [3, 0, 3]]);
  assert.strictEqual(g.shortestPath(3, 2), 6);
  assert.strictEqual(g.shortestPath(0, 3), -1);
  g.addEdge([1, 3, 4]);
  assert.strictEqual(g.shortestPath(0, 3), 6);
});

test('same node is distance 0', () => {
  const g = new Graph(1, []);
  assert.strictEqual(g.shortestPath(0, 0), 0);
});

test('matches Floyd-Warshall under random add/query sequences', () => {
  for (let t = 0; t < 150; t++) {
    const n = ri(1, 8);
    const pairs = [];
    for (let u = 0; u < n; u++) for (let v = 0; v < n; v++) if (u !== v) pairs.push([u, v]);
    pairs.sort(() => Math.random() - 0.5);
    const init = pairs.splice(0, ri(0, pairs.length)).map(([u, v]) => [u, v, ri(1, 1e6)]);
    const all = init.slice();
    const g = new Graph(n, init);
    for (let op = 0; op < 20; op++) {
      if (pairs.length && Math.random() < 0.4) {
        const [u, v] = pairs.pop();
        const e = [u, v, ri(1, 1e6)];
        g.addEdge(e);
        all.push(e);
      } else {
        const a = ri(0, n - 1), b = ri(0, n - 1);
        const D = floyd(n, all, true);
        assert.strictEqual(g.shortestPath(a, b), D[a][b] === Infinity ? -1 : D[a][b]);
      }
    }
  }
});
