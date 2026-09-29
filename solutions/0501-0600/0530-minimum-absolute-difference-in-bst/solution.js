/**
 * 530. Minimum Absolute Difference in BST
 * https://leetcode.com/problems/minimum-absolute-difference-in-bst/
 * Iterative in-order traversal visits BST values in sorted order; the minimum difference is between some pair of consecutive visited values.
 */
var getMinimumDifference = function (root) {
  const stack = [];
  let cur = root, prev = null, best = Infinity;
  while (cur || stack.length) {
    while (cur) {
      stack.push(cur);
      cur = cur.left;
    }
    cur = stack.pop();
    if (prev !== null) best = Math.min(best, cur.val - prev);
    prev = cur.val;
    cur = cur.right;
  }
  return best;
};

module.exports = { getMinimumDifference };
