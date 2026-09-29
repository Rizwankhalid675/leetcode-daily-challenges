/**
 * 101. Symmetric Tree
 * https://leetcode.com/problems/symmetric-tree/
 * Iteratively compare mirrored pairs: (left.left, right.right) and (left.right, right.left), starting from the root's two children.
 */
var isSymmetric = function (root) {
  const stack = [root.left, root.right];
  while (stack.length) {
    const b = stack.pop(), a = stack.pop();
    if (!a && !b) continue;
    if (!a || !b || a.val !== b.val) return false;
    stack.push(a.left, b.right, a.right, b.left);
  }
  return true;
};

module.exports = { isSymmetric };
