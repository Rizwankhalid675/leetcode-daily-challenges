/**
 * 222. Count Complete Tree Nodes
 * https://leetcode.com/problems/count-complete-tree-nodes/
 * Compare the leftmost and rightmost depths: if equal the subtree is perfect (2^h - 1 nodes), otherwise recurse on both children; only one of them is not perfect, so it is O(log^2 n).
 */
var countNodes = function (root) {
  if (!root) return 0;
  let lh = 0, rh = 0;
  for (let nd = root; nd; nd = nd.left) lh++;
  for (let nd = root; nd; nd = nd.right) rh++;
  if (lh === rh) return 2 ** lh - 1;
  return 1 + countNodes(root.left) + countNodes(root.right);
};

module.exports = { countNodes };
