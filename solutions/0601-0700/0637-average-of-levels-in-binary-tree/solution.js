/**
 * 637. Average of Levels in Binary Tree
 * https://leetcode.com/problems/average-of-levels-in-binary-tree/
 * BFS level by level with an index-based queue; divide each level's sum by its node count.
 */
var averageOfLevels = function (root) {
  const res = [];
  let level = [root];
  while (level.length) {
    const next = [];
    let sum = 0;
    for (const node of level) {
      sum += node.val;
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    res.push(sum / level.length);
    level = next;
  }
  return res;
};

module.exports = { averageOfLevels };
