/**
 * 2265. Count Nodes Equal to Average of Subtree
 * https://leetcode.com/problems/count-nodes-equal-to-average-of-subtree/
 *
 * Post-order DFS: each call returns [sum, count] for its subtree, so a node can compute
 * its own subtree average from its children's results in O(1).
 *
 * Definition for a binary tree node (provided by LeetCode):
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 *
 * @param {TreeNode} root
 * @return {number}
 */
var averageOfSubtree = function (root) {
  let matches = 0;

  const dfs = (node) => {
    if (node === null) return [0, 0];
    const [leftSum, leftCount] = dfs(node.left);
    const [rightSum, rightCount] = dfs(node.right);
    const sum = leftSum + rightSum + node.val;
    const count = leftCount + rightCount + 1;
    if (Math.floor(sum / count) === node.val) matches++;
    return [sum, count];
  };

  dfs(root);
  return matches;
};

module.exports = { averageOfSubtree };
