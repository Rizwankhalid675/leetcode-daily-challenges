const test = require('node:test');
const assert = require('node:assert');
const { TreeNode } = require('../../../tests/helpers/tree');
global.TreeNode = TreeNode; // LeetCode provides TreeNode globally
const { buildTree } = require('./solution');

function inorderOf(root) {
  const out = [], st = [];
  let cur = root;
  while (cur || st.length) {
    while (cur) { st.push(cur); cur = cur.left; }
    cur = st.pop();
    out.push(cur.val);
    cur = cur.right;
  }
  return out;
}
function postorderOf(root) {
  const out = [], st = root ? [root] : [];
  while (st.length) {
    const nd = st.pop();
    out.push(nd.val);
    if (nd.left) st.push(nd.left);
    if (nd.right) st.push(nd.right);
  }
  return out.reverse();
}
function levelOrder(root) {
  const out = [], q = [root];
  for (let h = 0; h < q.length; h++) {
    const nd = q[h];
    out.push(nd ? nd.val : null);
    if (nd) q.push(nd.left, nd.right);
  }
  while (out.length && out[out.length - 1] === null) out.pop();
  return out;
}
function randomTree(n) {
  const vals = [...Array(n).keys()].map((x) => x * 3 - 50).sort(() => Math.random() - 0.5);
  let root = null;
  for (const v of vals) {
    const node = new TreeNode(v);
    if (!root) { root = node; continue; }
    let cur = root;
    for (;;) {
      if (Math.random() < 0.5) { if (!cur.left) { cur.left = node; break; } cur = cur.left; }
      else { if (!cur.right) { cur.right = node; break; } cur = cur.right; }
    }
  }
  return root;
}

test('official examples', () => {
  assert.deepStrictEqual(levelOrder(buildTree([9, 3, 15, 20, 7], [9, 15, 7, 20, 3])), [3, 9, 20, null, null, 15, 7]);
  assert.deepStrictEqual(levelOrder(buildTree([-1], [-1])), [-1]);
});

test('round-trips random trees', () => {
  for (let t = 0; t < 1000; t++) {
    const tree = randomTree(1 + Math.floor(Math.random() * 15));
    const built = buildTree(inorderOf(tree), postorderOf(tree));
    assert.deepStrictEqual(levelOrder(built), levelOrder(tree));
  }
});

test('skewed trees of 3000 nodes (no deep recursion)', () => {
  const n = 3000;
  const asc = Array.from({ length: n }, (_, i) => i);
  // left-skewed chain: root n-1, each left child one smaller
  let r = buildTree(asc, asc);
  assert.deepStrictEqual(inorderOf(r), asc);
  assert.deepStrictEqual(postorderOf(r), asc);
  // right-skewed chain: root 0, each right child one larger
  const desc = [...asc].reverse();
  r = buildTree(asc, desc);
  assert.deepStrictEqual(inorderOf(r), asc);
  assert.deepStrictEqual(postorderOf(r), desc);
});
