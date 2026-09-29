const test = require('node:test');
const assert = require('node:assert');
// LeetCode provides _Node globally for this problem.
function _Node(val, neighbors) {
  this.val = val === undefined ? 0 : val;
  this.neighbors = neighbors === undefined ? [] : neighbors;
}
global._Node = _Node;
const { cloneGraph } = require('./solution');

function build(adj) {
  if (adj.length === 0) return { start: null, all: [] };
  const nodes = adj.map((_, i) => new _Node(i + 1));
  adj.forEach((list, i) => { nodes[i].neighbors = list.map((v) => nodes[v - 1]); });
  return { start: nodes[0], all: nodes };
}

// Walks the clone and rebuilds the adjacency list; also checks no original node leaked in.
function toAdj(start, originals) {
  if (!start) return [];
  const byVal = new Map();
  const queue = [start];
  byVal.set(start.val, start);
  for (let i = 0; i < queue.length; i++) {
    const cur = queue[i];
    assert.ok(!originals.has(cur), 'clone must not reuse original nodes');
    for (const nb of cur.neighbors) {
      if (byVal.has(nb.val)) assert.strictEqual(byVal.get(nb.val), nb, 'one copy per value');
      else { byVal.set(nb.val, nb); queue.push(nb); }
    }
  }
  const out = [];
  for (let v = 1; v <= byVal.size; v++) out.push(byVal.get(v).neighbors.map((x) => x.val));
  return out;
}

function check(adj) {
  const { start, all } = build(adj);
  const clone = cloneGraph(start);
  assert.deepStrictEqual(toAdj(clone, new Set(all)), adj);
  assert.deepStrictEqual(toAdj(start, new Set()), adj, 'original left unchanged');
}

test('official examples', () => {
  check([[2, 4], [1, 3], [2, 4], [1, 3]]);
  check([[]]);
  check([]);
  assert.strictEqual(cloneGraph(null), null);
});

test('random connected undirected graphs', () => {
  for (let t = 0; t < 300; t++) {
    const n = 1 + Math.floor(Math.random() * 12);
    const edges = new Set();
    for (let v = 2; v <= n; v++) { const u = 1 + Math.floor(Math.random() * (v - 1)); edges.add(u + ',' + v); }
    for (let k = 0; k < n; k++) {
      const u = 1 + Math.floor(Math.random() * n), v = 1 + Math.floor(Math.random() * n);
      if (u < v) edges.add(u + ',' + v);
    }
    const adj = Array.from({ length: n }, () => []);
    for (const e of edges) { const [u, v] = e.split(',').map(Number); adj[u - 1].push(v); adj[v - 1].push(u); }
    check(adj);
  }
});
