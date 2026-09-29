const test = require('node:test');
const assert = require('node:assert');
const { TreeNode, buildTree } = require('../../../tests/helpers/tree');
global.TreeNode = TreeNode; // LeetCode provides TreeNode globally
const { isValidBST } = require('./solution');

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
function randomBST(n, maxVal) {
  const vals = new Set();
  while (vals.size < n) vals.add(Math.floor(Math.random() * (maxVal + 1)));
  let root = null;
  for (const v of vals) {
    const nd = new TreeNode(v);
    if (!root) { root = nd; continue; }
    let cur = root;
    for (;;) {
      const side = v < cur.val ? 'left' : 'right';
      if (!cur[side]) { cur[side] = nd; break; }
      cur = cur[side];
    }
  }
  return { root, sorted: [...vals].sort((a, b) => a - b) };
}
function chain(vals, side) {
  let root = null;
  for (let i = vals.length - 1; i >= 0; i--) {
    const nd = new TreeNode(vals[i]);
    nd[side] = root;
    root = nd;
  }
  return root;
}
// Oracle: definition check with explicit (low, high) bounds for every node.
function oracle(root) {
  const go = (nd, lo, hi) => !nd || (nd.val > lo && nd.val < hi && go(nd.left, lo, nd.val) && go(nd.right, nd.val, hi));
  return go(root, -Infinity, Infinity);
}

test('official examples', () => {
  assert.strictEqual(isValidBST(buildTree([2, 1, 3])), true);
  assert.strictEqual(isValidBST(buildTree([5, 1, 4, null, null, 3, 6])), false);
});

test('duplicates, deep violations, 32-bit extremes', () => {
  assert.strictEqual(isValidBST(buildTree([2, 2, 2])), false);
  assert.strictEqual(isValidBST(buildTree([1, 1])), false);
  assert.strictEqual(isValidBST(buildTree([5, 4, 6, null, null, 3, 7])), false); // 3 is below the root
  assert.strictEqual(isValidBST(buildTree([-2147483648])), true);
  assert.strictEqual(isValidBST(buildTree([2147483647])), true);
  assert.strictEqual(isValidBST(buildTree([-2147483648, null, 2147483647])), true);
});

test('matches bounds-based definition', () => {
  for (let t = 0; t < 2000; t++) {
    let root;
    if (Math.random() < 0.5) {
      root = randomBST(rint(1, 15), 30).root;
      if (Math.random() < 0.5) {
        // perturb one random node's value
        const nodes = [], st = [root];
        while (st.length) { const nd = st.pop(); nodes.push(nd); if (nd.left) st.push(nd.left); if (nd.right) st.push(nd.right); }
        nodes[rint(0, nodes.length - 1)].val = rint(0, 30);
      }
    } else root = randomTree(rint(1, 6), () => rint(0, 4));
    assert.strictEqual(isValidBST(root), oracle(root));
  }
});

test('10^4-node chains', () => {
  const vals = Array.from({ length: 1e4 }, (_, i) => i);
  assert.strictEqual(isValidBST(chain(vals, 'right')), true);
  assert.strictEqual(isValidBST(chain(vals, 'left')), false);
});
