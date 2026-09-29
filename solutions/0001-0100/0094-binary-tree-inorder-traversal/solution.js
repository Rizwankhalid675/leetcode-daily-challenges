/**
 * 94. Binary Tree Inorder Traversal
 * https://leetcode.com/problems/binary-tree-inorder-traversal/
 * Iterative inorder with an explicit stack: slide left pushing nodes, pop and visit, then move to the right child.
 */
var inorderTraversal = function (root) {
  const res = [];
  const stack = [];
  let node = root;
  while (node || stack.length) {
    while (node) {
      stack.push(node);
      node = node.left;
    }
    node = stack.pop();
    res.push(node.val);
    node = node.right;
  }
  return res;
};

module.exports = { inorderTraversal };
