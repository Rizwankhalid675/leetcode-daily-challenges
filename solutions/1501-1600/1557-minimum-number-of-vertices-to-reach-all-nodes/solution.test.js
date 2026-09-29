const test = require('node:test');
const assert = require('node:assert');
const { findSmallestSetOfVertices } = require('./solution');

const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
function reachesAll(n, edges, starts) {
  const adj = Array.from({ length: n }, () => []);
  for (const [a, b] of edges) adj[a].push(b);
  const seen = new Array(n).fill(false);
  const st = [...starts];
  for (const s of starts) seen[s] = true;
  while (st.length) { const u = st.pop(); for (const v of adj[u]) if (!seen[v]) { seen[v] = true; st.push(v); } }
  return seen.every(Boolean);
}
function bruteMinSize(n, edges) {
  let best = n;
  for (let m = 0; m < 1 << n; m++) {
    const s = [];
    for (let i = 0; i < n; i++) if (m >> i & 1) s.push(i);
    if (s.length < best && reachesAll(n, edges, s)) best = s.length;
  }
  return best;
}

test('official examples', () => {
  assert.deepStrictEqual(findSmallestSetOfVertices(6, [[0, 1], [0, 2], [2, 5], [3, 4], [4, 2]]).sort((a, b) => a - b), [0, 3]);
  assert.deepStrictEqual(findSmallestSetOfVertices(5, [[0, 1], [2, 1], [3, 1], [1, 4], [2, 4]]).sort((a, b) => a - b), [0, 2, 3]);
});

test('result reaches everything and has minimum size (random DAGs)', () => {
  for (let t = 0; t < 300; t++) {
    const n = ri(2, 9);
    const perm = [...Array(n).keys()].sort(() => Math.random() - 0.5);
    const edges = [];
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (Math.random() < 0.3) edges.push([perm[i], perm[j]]);
    if (!edges.length) edges.push([perm[0], perm[1]]);
    const res = findSmallestSetOfVertices(n, edges);
    assert.ok(reachesAll(n, edges, res));
    assert.strictEqual(res.length, bruteMinSize(n, edges));
  }
});
