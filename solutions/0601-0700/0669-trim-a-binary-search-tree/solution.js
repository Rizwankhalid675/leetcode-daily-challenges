/**
 * 669. Trim a Binary Search Tree
 * https://leetcode.com/problems/trim-a-binary-search-tree/
 * Move the root down until it lies in [low, high]. Then along the left spine, replace any child below low with its right subtree; symmetrically along the right spine for values above high. Iterative, O(h).
 */
var trimBST = function (root, low, high) {
  while (root && (root.val < low || root.val > high)) {
    root = root.val < low ? root.right : root.left;
  }
  if (!root) return null;
  // left side: only values below low can be out of range here
  let node = root;
  while (node) {
    while (node.left && node.left.val < low) node.left = node.left.right;
    node = node.left;
  }
  // right side: only values above high can be out of range here
  node = root;
  while (node) {
    while (node.right && node.right.val > high) node.right = node.right.left;
    node = node.right;
  }
  return root;
};

module.exports = { trimBST };
