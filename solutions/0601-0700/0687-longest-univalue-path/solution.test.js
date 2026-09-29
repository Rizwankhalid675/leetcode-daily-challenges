const test = require('node:test');
const assert = require('node:assert');
const { TreeNode, buildTree } = require('../../../tests/helpers/tree');
global.TreeNode = TreeNode; // LeetCode provides TreeNode globally
const { longestUnivaluePath } = require('./solution');

function brute(values) {
  // explicit graph; from every node, farthest node reachable through equal-valued nodes
  const root = buildTree(values);
  if (!root) return 0;
  const nodes = [];
  const adj = [];
  const q = [root];
  const id = new Map([[root, 0]]);
  nodes.push(root); adj.push([]);
  for (let h = 0; h < q.length; h++) {
    const n = q[h];
    for (const c of [n.left, n.right]) if (c) {
      id.set(c, nodes.length); nodes.push(c); adj.push([]);
      adj[id.get(n)].push(id.get(c)); adj[id.get(c)].push(id.get(n));
      q.push(c);
    }
  }
  let best = 0;
  for (let s = 0; s < nodes.length; s++) {
    const dist = new Array(nodes.length).fill(-1);
    dist[s] = 0;
    const qq = [s];
    for (let h = 0; h < qq.length; h++) for (const v of adj[qq[h]]) {
      if (dist[v] === -1 && nodes[v].val === nodes[s].val) { dist[v] = dist[qq[h]] + 1; best = Math.max(best, dist[v]); qq.push(v); }
    }
  }
  return best;
}

test('official examples', () => {
  assert.strictEqual(longestUnivaluePath(buildTree([5, 4, 5, 1, 1, null, 5])), 2);
  assert.strictEqual(longestUnivaluePath(buildTree([1, 4, 5, 4, 4, null, 5])), 2);
});

test('empty and single node', () => {
  assert.strictEqual(longestUnivaluePath(null), 0);
  assert.strictEqual(longestUnivaluePath(buildTree([7])), 0);
});

test('matches BFS-over-equal-values brute force', () => {
  for (let t = 0; t < 500; t++) {
    const n = Math.floor(Math.random() * 25);
    const vals = Array.from({ length: n }, () => (Math.random() < 0.2 ? null : Math.floor(Math.random() * 3)));
    if (vals.length) vals[0] = 1;
    assert.strictEqual(longestUnivaluePath(buildTree(vals)), brute(vals));
  }
});

test('skewed chain of 10^4 equal values', () => {
  const root = new TreeNode(1);
  let cur = root;
  for (let i = 1; i < 10000; i++) cur = cur.right = new TreeNode(1);
  assert.strictEqual(longestUnivaluePath(root), 9999);
});
