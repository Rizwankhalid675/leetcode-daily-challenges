/**
 * 102. Binary Tree Level Order Traversal
 * https://leetcode.com/problems/binary-tree-level-order-traversal/
 * BFS one level at a time: record each level's values and collect its children as the next level.
 */
var levelOrder = function (root) {
  const res = [];
  let level = root ? [root] : [];
  while (level.length) {
    const vals = [], next = [];
    for (const node of level) {
      vals.push(node.val);
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    res.push(vals);
    level = next;
  }
  return res;
};

module.exports = { levelOrder };
