const test = require('node:test');
const assert = require('node:assert');
const { TreeNode, buildTree } = require('../../../tests/helpers/tree');
global.TreeNode = TreeNode; // LeetCode provides TreeNode globally
const { inorderTraversal } = require('./solution');

function rec(node, out = []) {
  if (!node) return out;
  rec(node.left, out);
  out.push(node.val);
  rec(node.right, out);
  return out;
}

test('official examples', () => {
  assert.deepStrictEqual(inorderTraversal(buildTree([1, null, 2, 3])), [1, 3, 2]);
  assert.deepStrictEqual(inorderTraversal(buildTree([1, 2, 3, 4, 5, null, 8, null, null, 6, 7, 9])), [4, 2, 6, 5, 7, 1, 3, 9, 8]);
  assert.deepStrictEqual(inorderTraversal(buildTree([])), []);
  assert.deepStrictEqual(inorderTraversal(buildTree([1])), [1]);
});

test('matches recursive traversal on random trees', () => {
  for (let t = 0; t < 300; t++) {
    const n = Math.floor(Math.random() * 30);
    const arr = Array.from({ length: n }, (_, i) => (i > 0 && Math.random() < 0.3 ? null : Math.floor(Math.random() * 201) - 100));
    const root = buildTree(arr);
    assert.deepStrictEqual(inorderTraversal(root), rec(root));
  }
});
