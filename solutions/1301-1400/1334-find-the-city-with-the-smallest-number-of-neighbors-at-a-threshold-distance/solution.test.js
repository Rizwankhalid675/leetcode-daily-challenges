const test = require('node:test');
const assert = require('node:assert');
const { findTheCity } = require('./solution');

const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
// oracle: Bellman-Ford from every source
function brute(n, edges, th) {
  let best = -1, bc = Infinity;
  for (let s = 0; s < n; s++) {
    const d = new Array(n).fill(Infinity);
    d[s] = 0;
    for (let it = 0; it < n; it++) for (const [u, v, w] of edges) {
      if (d[u] + w < d[v]) d[v] = d[u] + w;
      if (d[v] + w < d[u]) d[u] = d[v] + w;
    }
    const c = d.filter((x, j) => j !== s && x <= th).length;
    if (c < bc || (c === bc && s > best)) { bc = c; best = s; }
  }
  return best;
}

test('official examples', () => {
  assert.strictEqual(findTheCity(4, [[0, 1, 3], [1, 2, 1], [1, 3, 4], [2, 3, 1]], 4), 3);
  assert.strictEqual(findTheCity(5, [[0, 1, 2], [0, 4, 8], [1, 2, 3], [1, 4, 2], [2, 3, 1], [3, 4, 1]], 2), 0);
});

test('all tied picks the largest index', () => {
  assert.strictEqual(findTheCity(3, [[0, 1, 100]], 5), 2);
  assert.strictEqual(findTheCity(2, [[0, 1, 1]], 1), 1);
});

test('matches per-source Bellman-Ford on random graphs', () => {
  for (let t = 0; t < 500; t++) {
    const n = ri(2, 10);
    const edges = [];
    for (let u = 0; u < n; u++) for (let v = u + 1; v < n; v++) if (Math.random() < 0.35) edges.push([u, v, ri(1, 20)]);
    if (!edges.length) edges.push([0, 1, ri(1, 20)]);
    const th = ri(1, 40);
    assert.strictEqual(findTheCity(n, edges, th), brute(n, edges, th));
  }
});
