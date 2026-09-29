/**
 * 98. Validate Binary Search Tree
 * https://leetcode.com/problems/validate-binary-search-tree/
 * Iterative in-order traversal; the tree is a valid BST exactly when the visited values are strictly increasing.
 */
var isValidBST = function (root) {
  const stack = [];
  let cur = root, prev = -Infinity;
  while (cur || stack.length) {
    while (cur) {
      stack.push(cur);
      cur = cur.left;
    }
    cur = stack.pop();
    if (cur.val <= prev) return false;
    prev = cur.val;
    cur = cur.right;
  }
  return true;
};

module.exports = { isValidBST };
