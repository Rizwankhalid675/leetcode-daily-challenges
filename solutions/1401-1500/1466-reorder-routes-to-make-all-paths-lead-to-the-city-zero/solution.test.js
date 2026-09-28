const test = require('node:test');
const assert = require('node:assert');
const { minReorder } = require('./solution');

// Reference: a road needs flipping iff its "to" city is farther from 0 than its "from" city.
function byDepth(n, connections) {
  const adj = Array.from({ length: n }, () => []);
  for (const [a, b] of connections) adj[a].push(b), adj[b].push(a);
  const depth = new Array(n).fill(-1);
  depth[0] = 0;
  const q = [0];
  for (let h = 0; h < q.length; h++) for (const v of adj[q[h]]) if (depth[v] < 0) (depth[v] = depth[q[h]] + 1), q.push(v);
  return connections.filter(([a, b]) => depth[b] > depth[a]).length;
}

test('official examples', () => {
  assert.strictEqual(minReorder(6, [[0, 1], [1, 3], [2, 3], [4, 0], [4, 5]]), 3);
  assert.strictEqual(minReorder(5, [[1, 0], [1, 2], [3, 2], [3, 4]]), 2);
  assert.strictEqual(minReorder(3, [[1, 0], [2, 0]]), 0);
});

test('matches depth-based reference on random trees', () => {
  for (let t = 0; t < 500; t++) {
    const n = 2 + Math.floor(Math.random() * 15);
    const connections = [];
    for (let v = 1; v < n; v++) {
      const u = Math.floor(Math.random() * v);
      connections.push(Math.random() < 0.5 ? [u, v] : [v, u]);
    }
    assert.strictEqual(minReorder(n, connections), byDepth(n, connections));
  }
});

test('5*10^4-city path runs iteratively', () => {
  const n = 50000;
  const connections = Array.from({ length: n - 1 }, (_, i) => [i, i + 1]); // all point away from 0
  assert.strictEqual(minReorder(n, connections), n - 1);
});
