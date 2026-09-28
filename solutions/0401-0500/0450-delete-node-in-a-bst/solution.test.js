const test = require('node:test');
const assert = require('node:assert');
const { deleteNode } = require('./solution');
const { TreeNode, buildTree } = require('../../../tests/helpers/tree');

const inorder = (n, out = []) => {
  if (n) inorder(n.left, out), out.push(n.val), inorder(n.right, out);
  return out;
};
const isBST = (n, lo = -Infinity, hi = Infinity) => !n || (n.val > lo && n.val < hi && isBST(n.left, lo, n.val) && isBST(n.right, n.val, hi));
const insert = (root, v) => {
  if (!root) return new TreeNode(v);
  let n = root;
  for (;;) {
    if (v < n.val) {
      if (!n.left) return (n.left = new TreeNode(v)), root;
      n = n.left;
    } else {
      if (!n.right) return (n.right = new TreeNode(v)), root;
      n = n.right;
    }
  }
};

// Any valid answer is accepted, so check: still a BST, and in-order = original minus key.
const check = (root, key) => {
  const before = inorder(root);
  const after = deleteNode(root, key);
  assert.ok(isBST(after));
  assert.deepStrictEqual(inorder(after), before.filter((v) => v !== key));
};

test('official examples', () => {
  check(buildTree([5, 3, 6, 2, 4, null, 7]), 3);
  check(buildTree([5, 3, 6, 2, 4, null, 7]), 0); // key absent
  assert.strictEqual(deleteNode(null, 0), null);
});

test('edge cases', () => {
  assert.strictEqual(deleteNode(buildTree([1]), 1), null); // only node
  check(buildTree([5, 3, 6, 2, 4, null, 7]), 5); // root with two children
  check(buildTree([2, 1]), 2); // root with one child
});

test('random BSTs, deleting every present key and some absent ones', () => {
  for (let t = 0; t < 300; t++) {
    const vals = [...new Set(Array.from({ length: 1 + Math.floor(Math.random() * 15) }, () => Math.floor(Math.random() * 40)))];
    for (const key of [...vals, -1, 99]) {
      let root = null;
      for (const v of vals) root = insert(root, v);
      check(root, key);
    }
  }
});
