/**
 * 2236. Root Equals Sum of Children
 * https://leetcode.com/problems/root-equals-sum-of-children/
 * The tree always has exactly three nodes, so compare the root value with the sum of its two children directly.
 */
var checkTree = function (root) {
  return root.val === root.left.val + root.right.val;
};

module.exports = { checkTree };
