const test = require('node:test');
const assert = require('node:assert');
const { TreeNode, buildTree } = require('../../../tests/helpers/tree');
global.TreeNode = TreeNode; // LeetCode provides TreeNode globally
const { sortedArrayToBST } = require('./solution');

function inorder(root, out = []) {
  if (root) { inorder(root.left, out); out.push(root.val); inorder(root.right, out); }
  return out;
}
// Returns height, or -1 if some node is unbalanced.
function balancedHeight(root) {
  if (!root) return 0;
  const l = balancedHeight(root.left), r = balancedHeight(root.right);
  if (l < 0 || r < 0 || Math.abs(l - r) > 1) return -1;
  return 1 + Math.max(l, r);
}
function check(nums) {
  const root = sortedArrayToBST(nums);
  assert.deepStrictEqual(inorder(root), nums); // BST with exactly these values
  assert.ok(balancedHeight(root) >= 0, 'height-balanced');
}

test('official examples (any balanced BST is accepted)', () => {
  check([-10, -3, 0, 5, 9]);
  check([1, 3]);
  assert.ok(sortedArrayToBST([-10, -3, 0, 5, 9]) instanceof TreeNode);
});

test('random sorted arrays up to 10^4', () => {
  for (const n of [1, 2, 3, 4, 7, 8, 15, 16, 100, 1023, 10000]) {
    const set = new Set();
    while (set.size < n) set.add(Math.floor(Math.random() * 2e4) - 1e4);
    check([...set].sort((a, b) => a - b));
  }
});
