/**
 * 114. Flatten Binary Tree to Linked List
 * https://leetcode.com/problems/flatten-binary-tree-to-linked-list/
 * Morris-style O(1) space: at each node with a left child, hang the right subtree off the rightmost node of the left subtree, move the left subtree to the right, and continue down the right chain.
 */
var flatten = function (root) {
  let cur = root;
  while (cur) {
    if (cur.left) {
      let pred = cur.left;
      while (pred.right) pred = pred.right;
      pred.right = cur.right;
      cur.right = cur.left;
      cur.left = null;
    }
    cur = cur.right;
  }
};

module.exports = { flatten };
