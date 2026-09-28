/**
 * 1448. Count Good Nodes in Binary Tree
 * https://leetcode.com/problems/count-good-nodes-in-binary-tree/
 *
 * DFS carrying the maximum value seen on the path from the root. A node is good if its
 * value is >= that maximum. Iterative with an explicit stack: up to 10^5 nodes means a
 * chain-shaped tree would overflow JavaScript's call stack if done recursively.
 *
 * @param {TreeNode} root
 * @return {number}
 */
var goodNodes = function (root) {
  let good = 0;
  const stack = [[root, -Infinity]];
  while (stack.length > 0) {
    const [node, pathMax] = stack.pop();
    if (node.val >= pathMax) good++;
    const nextMax = Math.max(pathMax, node.val);
    if (node.left) stack.push([node.left, nextMax]);
    if (node.right) stack.push([node.right, nextMax]);
  }
  return good;
};

module.exports = { goodNodes };
