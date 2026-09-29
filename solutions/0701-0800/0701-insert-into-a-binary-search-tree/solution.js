/**
 * 701. Insert into a Binary Search Tree
 * https://leetcode.com/problems/insert-into-a-binary-search-tree/
 * Walk down from the root choosing left or right by comparison until reaching an empty spot, then hang the new leaf there. Iterative, so skewed trees are fine.
 */
var insertIntoBST = function (root, val) {
  const leaf = new TreeNode(val);
  if (!root) return leaf;
  let node = root;
  for (;;) {
    if (val < node.val) {
      if (!node.left) { node.left = leaf; break; }
      node = node.left;
    } else {
      if (!node.right) { node.right = leaf; break; }
      node = node.right;
    }
  }
  return root;
};

module.exports = { insertIntoBST };
