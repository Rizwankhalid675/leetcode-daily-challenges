/**
 * 450. Delete Node in a BST
 * https://leetcode.com/problems/delete-node-in-a-bst/
 *
 * Iterative (up to 10^4 nodes, possibly unbalanced):
 * 1. Find the node and its parent.
 * 2. If it has two children, copy in the value of its in-order successor (the leftmost
 *    node of its right subtree) and delete that successor instead; it has no left child.
 * 3. The node now being removed has at most one child: splice that child into its place.
 *
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
  let parent = null;
  let node = root;
  while (node !== null && node.val !== key) {
    parent = node;
    node = key < node.val ? node.left : node.right;
  }
  if (node === null) return root; // key not present

  if (node.left !== null && node.right !== null) {
    let succParent = node;
    let succ = node.right;
    while (succ.left !== null) {
      succParent = succ;
      succ = succ.left;
    }
    node.val = succ.val;
    parent = succParent; // now remove the successor node instead
    node = succ;
  }

  const child = node.left !== null ? node.left : node.right;
  if (parent === null) return child; // removing the root
  if (parent.left === node) parent.left = child;
  else parent.right = child;
  return root;
};

module.exports = { deleteNode };
