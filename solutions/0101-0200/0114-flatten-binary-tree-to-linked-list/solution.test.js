const test = require('node:test');
const assert = require('node:assert');
const { TreeNode, buildTree } = require('../../../tests/helpers/tree');
global.TreeNode = TreeNode; // LeetCode provides TreeNode globally
const { flatten } = require('./solution');

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
function preorder(root) {
  const out = [], st = root ? [root] : [];
  while (st.length) {
    const nd = st.pop();
    out.push(nd);
    if (nd.right) st.push(nd.right);
    if (nd.left) st.push(nd.left);
  }
  return out;
}
function check(root) {
  const want = preorder(root); // same node objects, in preorder
  flatten(root);
  let i = 0;
  for (let nd = root; nd; nd = nd.right, i++) {
    assert.strictEqual(nd, want[i]);
    assert.strictEqual(nd.left, null);
  }
  assert.strictEqual(i, want.length);
}

test('official examples', () => {
  const r = buildTree([1, 2, 5, 3, 4, null, 6]);
  flatten(r);
  assert.deepStrictEqual(toArr(r), [1, null, 2, null, 3, null, 4, null, 5, null, 6]);
  const e = buildTree([]);
  flatten(e);
  assert.strictEqual(e, null);
  const z = buildTree([0]);
  flatten(z);
  assert.deepStrictEqual(toArr(z), [0]);
});

test('reuses the same nodes in preorder on random trees', () => {
  for (let t = 0; t < 1000; t++) check(randomTree(rint(0, 30), () => rint(-100, 100)));
});

test('2000-node left chain', () => {
  let root = null;
  for (let i = 0; i < 2000; i++) root = new TreeNode(i, root, null);
  check(root);
});
