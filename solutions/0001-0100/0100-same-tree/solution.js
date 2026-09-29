/**
 * 100. Same Tree
 * https://leetcode.com/problems/same-tree/
 * Iterative pairwise walk: pop a pair of nodes, both null is fine, one null or different values means different, otherwise push the left pair and the right pair.
 */
var isSameTree = function (p, q) {
  const stack = [p, q];
  while (stack.length) {
    const b = stack.pop(), a = stack.pop();
    if (!a && !b) continue;
    if (!a || !b || a.val !== b.val) return false;
    stack.push(a.left, b.left, a.right, b.right);
  }
  return true;
};

module.exports = { isSameTree };
