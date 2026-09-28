/**
 * 1161. Maximum Level Sum of a Binary Tree
 * https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/
 *
 * Level-order traversal computing each level's sum; keep the smallest level index with
 * the largest sum (strict > so ties keep the earlier level).
 *
 * @param {TreeNode} root
 * @return {number}
 */
var maxLevelSum = function (root) {
  let bestLevel = 1;
  let bestSum = -Infinity;
  let level = [root];
  for (let depth = 1; level.length > 0; depth++) {
    let sum = 0;
    const next = [];
    for (const node of level) {
      sum += node.val;
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    if (sum > bestSum) {
      bestSum = sum;
      bestLevel = depth;
    }
    level = next;
  }
  return bestLevel;
};

module.exports = { maxLevelSum };
