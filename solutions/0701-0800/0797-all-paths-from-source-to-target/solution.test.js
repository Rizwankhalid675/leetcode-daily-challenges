const test = require('node:test');
const assert = require('node:assert');
const { allPathsSourceTarget } = require('./solution');

const norm = (paths) => paths.map((p) => p.join(',')).sort();

function brute(graph) {
  // BFS over partial paths (independent of the DFS)
  const n = graph.length;
  const res = [];
  let layer = [[0]];
  while (layer.length) {
    const next = [];
    for (const p of layer) {
      const u = p[p.length - 1];
      if (u === n - 1) { res.push(p); continue; }
      for (const v of graph[u]) next.push([...p, v]);
    }
    layer = next;
  }
  return res;
}

test('official examples', () => {
  assert.deepStrictEqual(norm(allPathsSourceTarget([[1, 2], [3], [3], []])), norm([[0, 1, 3], [0, 2, 3]]));
  assert.deepStrictEqual(
    norm(allPathsSourceTarget([[4, 3, 1], [3, 2, 4], [3], [4], []])),
    norm([[0, 4], [0, 3, 4], [0, 1, 3, 4], [0, 1, 2, 3, 4], [0, 1, 4]]),
  );
});

test('matches BFS enumeration on random DAGs', () => {
  for (let t = 0; t < 500; t++) {
    const n = 2 + Math.floor(Math.random() * 8);
    const graph = Array.from({ length: n }, (_, u) => {
      const adj = [];
      for (let v = u + 1; v < n; v++) if (Math.random() < 0.5) adj.push(v);
      return adj;
    });
    assert.deepStrictEqual(norm(allPathsSourceTarget(graph)), norm(brute(graph)));
  }
});

test('complete DAG on 15 nodes has 2^13 paths', () => {
  const n = 15;
  const graph = Array.from({ length: n }, (_, u) => Array.from({ length: n - u - 1 }, (_, i) => u + 1 + i));
  assert.strictEqual(allPathsSourceTarget(graph).length, 1 << 13);
});
