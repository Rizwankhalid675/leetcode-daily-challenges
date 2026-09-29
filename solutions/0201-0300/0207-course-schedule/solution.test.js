const test = require('node:test');
const assert = require('node:assert');
const { canFinish } = require('./solution');

// Oracle: recursive three-colour DFS cycle detection (fine for small graphs).
function hasCycle(n, edges) {
  const adj = Array.from({ length: n }, () => []);
  for (const [a, b] of edges) adj[b].push(a);
  const color = new Array(n).fill(0);
  const dfs = (u) => {
    color[u] = 1;
    for (const v of adj[u]) {
      if (color[v] === 1) return true;
      if (color[v] === 0 && dfs(v)) return true;
    }
    color[u] = 2;
    return false;
  };
  for (let i = 0; i < n; i++) if (color[i] === 0 && dfs(i)) return true;
  return false;
}

test('official examples', () => {
  assert.strictEqual(canFinish(2, [[1, 0]]), true);
  assert.strictEqual(canFinish(2, [[1, 0], [0, 1]]), false);
});

test('edge cases', () => {
  assert.strictEqual(canFinish(1, []), true);
  assert.strictEqual(canFinish(3, [[0, 0]]), false); // self-loop
  assert.strictEqual(canFinish(3, [[1, 0], [1, 0]]), true); // duplicate edge
  assert.strictEqual(canFinish(4, [[1, 0], [2, 1], [3, 2], [1, 3]]), false);
});

test('matches DFS cycle detection on random graphs', () => {
  for (let t = 0; t < 1000; t++) {
    const n = 1 + Math.floor(Math.random() * 7);
    const m = Math.floor(Math.random() * 10);
    const edges = Array.from({ length: m }, () => [Math.floor(Math.random() * n), Math.floor(Math.random() * n)]);
    assert.strictEqual(canFinish(n, edges), !hasCycle(n, edges));
  }
});

test('max size chain of 2000 courses', () => {
  const edges = [];
  for (let i = 1; i < 2000; i++) edges.push([i, i - 1]);
  assert.strictEqual(canFinish(2000, edges), true);
  edges.push([0, 1999]);
  assert.strictEqual(canFinish(2000, edges), false);
});
