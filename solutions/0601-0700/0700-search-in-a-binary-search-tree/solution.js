/**
 * 700. Search in a Binary Search Tree
 * https://leetcode.com/problems/search-in-a-binary-search-tree/
 *
 * Walk down from the root, going left for smaller targets and right for larger ones.
 *
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function (root, val) {
  let node = root;
  while (node !== null && node.val !== val) node = val < node.val ? node.left : node.right;
  return node;
};

module.exports = { searchBST };
