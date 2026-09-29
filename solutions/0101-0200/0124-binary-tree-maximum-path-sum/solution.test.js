const test = require('node:test');
const assert = require('node:assert');
const { TreeNode, buildTree } = require('../../../tests/helpers/tree');
global.TreeNode = TreeNode; // LeetCode provides TreeNode globally
const { maxPathSum } = require('./solution');

function toArr(root) {
  const out = [], q = [root];
  for (let h = 0; h < q.length; h++) {
    const nd = q[h];
    if (nd) { out.push(nd.val); q.push(nd.left, nd.right); } else out.push(null);
  }
  while (out.length && out[out.length - 1] === null) out.pop();
  return out;
}
function randomTree(n, val) {
  let root = null;
  for (let i = 0; i < n; i++) {
    const nd = new TreeNode(val(i));
    if (!root) { root = nd; continue; }
    let cur = root;
    for (;;) {
      const side = Math.random() < 0.5 ? 'left' : 'right';
      if (!cur[side]) { cur[side] = nd; break; }
      cur = cur[side];
    }
  }
  return root;
}
const rint = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
// Brute force: best sum over all simple paths = for every pair (u, v), sum along the tree path.
function brute(root) {
  const nodes = [], parent = new Map(), depth = new Map();
  const st = [[root, null, 0]];
  while (st.length) {
    const [nd, p, d] = st.pop();
    nodes.push(nd); parent.set(nd, p); depth.set(nd, d);
    if (nd.left) st.push([nd.left, nd, d + 1]);
    if (nd.right) st.push([nd.right, nd, d + 1]);
  }
  let best = -Infinity;
  for (const u of nodes) for (const v of nodes) {
    let a = u, b = v, s = 0;
    while (depth.get(a) > depth.get(b)) { s += a.val; a = parent.get(a); }
    while (depth.get(b) > depth.get(a)) { s += b.val; b = parent.get(b); }
    while (a !== b) { s += a.val + b.val; a = parent.get(a); b = parent.get(b); }
    s += a.val;
    best = Math.max(best, s);
  }
  return best;
}

test('official examples', () => {
  assert.strictEqual(maxPathSum(buildTree([1, 2, 3])), 6);
  assert.strictEqual(maxPathSum(buildTree([-10, 9, 20, null, null, 15, 7])), 42);
});

test('all negative picks the single largest node', () => {
  assert.strictEqual(maxPathSum(buildTree([-3])), -3);
  assert.strictEqual(maxPathSum(buildTree([-2, -1, -5])), -1);
});

test('matches all-pairs brute force', () => {
  for (let t = 0; t < 500; t++) {
    const root = randomTree(rint(1, 14), () => rint(-10, 10));
    assert.strictEqual(maxPathSum(root), brute(root));
  }
});

test('3 * 10^4-node chain', () => {
  let root = null;
  for (let i = 0; i < 30000; i++) root = new TreeNode(i % 2 ? 1000 : -1, null, root);
  const t0 = Date.now();
  assert.strictEqual(maxPathSum(root), 15000 * 1000 - 14999);
  assert.ok(Date.now() - t0 < 500);
});
