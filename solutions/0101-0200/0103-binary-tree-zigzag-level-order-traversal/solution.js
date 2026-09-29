/**
 * 103. Binary Tree Zigzag Level Order Traversal
 * https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/
 * Level-order BFS; reverse every other level's value list (odd depths read right to left).
 */
var zigzagLevelOrder = function (root) {
  const res = [];
  let level = root ? [root] : [];
  let rightToLeft = false;
  while (level.length) {
    const vals = [], next = [];
    for (const node of level) {
      vals.push(node.val);
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    if (rightToLeft) vals.reverse();
    res.push(vals);
    rightToLeft = !rightToLeft;
    level = next;
  }
  return res;
};

module.exports = { zigzagLevelOrder };
