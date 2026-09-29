const test = require('node:test');
const assert = require('node:assert');
const { TreeNode, buildTree } = require('../../../tests/helpers/tree');
global.TreeNode = TreeNode; // LeetCode provides TreeNode globally
const { diameterOfBinaryTree } = require('./solution');

function brute(values) {
  const root = buildTree(values);
  const nodes = [];
  const adj = [];
  const id = new Map([[root, 0]]);
  nodes.push(root); adj.push([]);
  const q = [root];
  for (let h = 0; h < q.length; h++) {
    for (const c of [q[h].left, q[h].right]) if (c) {
      id.set(c, nodes.length); nodes.push(c); adj.push([]);
      adj[id.get(q[h])].push(id.get(c)); adj[id.get(c)].push(id.get(q[h]));
      q.push(c);
    }
  }
  let best = 0;
  for (let s = 0; s < nodes.length; s++) {
    const dist = new Array(nodes.length).fill(-1);
    dist[s] = 0;
    const qq = [s];
    for (let h = 0; h < qq.length; h++) for (const v of adj[qq[h]]) if (dist[v] === -1) { dist[v] = dist[qq[h]] + 1; best = Math.max(best, dist[v]); qq.push(v); }
  }
  return best;
}

test('official examples', () => {
  assert.strictEqual(diameterOfBinaryTree(buildTree([1, 2, 3, 4, 5])), 3);
  assert.strictEqual(diameterOfBinaryTree(buildTree([1, 2])), 1);
});

test('single node', () => {
  assert.strictEqual(diameterOfBinaryTree(buildTree([1])), 0);
});

test('matches all-pairs BFS brute force', () => {
  for (let t = 0; t < 500; t++) {
    const n = 1 + Math.floor(Math.random() * 30);
    const vals = Array.from({ length: n }, (_, i) => (i > 0 && Math.random() < 0.3 ? null : i));
    assert.strictEqual(diameterOfBinaryTree(buildTree(vals)), brute(vals));
  }
});

test('skewed chain of 10^4 nodes', () => {
  const root = new TreeNode(0);
  let cur = root;
  for (let i = 1; i < 10000; i++) cur = cur.left = new TreeNode(i);
  assert.strictEqual(diameterOfBinaryTree(root), 9999);
});
