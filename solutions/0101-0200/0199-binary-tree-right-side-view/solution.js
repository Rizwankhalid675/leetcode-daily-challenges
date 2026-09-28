/**
 * 199. Binary Tree Right Side View
 * https://leetcode.com/problems/binary-tree-right-side-view/
 *
 * Level-order traversal; the last node of each level is the one visible from the right.
 *
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function (root) {
  const view = [];
  let level = root ? [root] : [];
  while (level.length > 0) {
    view.push(level[level.length - 1].val);
    const next = [];
    for (const node of level) {
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    level = next;
  }
  return view;
};

module.exports = { rightSideView };
