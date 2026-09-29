/**
 * 112. Path Sum
 * https://leetcode.com/problems/path-sum/
 * Iterative DFS carrying the remaining sum; return true at the first leaf whose value equals what remains.
 */
var hasPathSum = function (root, targetSum) {
  if (!root) return false;
  const nodes = [root], rest = [targetSum];
  while (nodes.length) {
    const node = nodes.pop();
    const r = rest.pop() - node.val;
    if (!node.left && !node.right) {
      if (r === 0) return true;
      continue;
    }
    if (node.left) { nodes.push(node.left); rest.push(r); }
    if (node.right) { nodes.push(node.right); rest.push(r); }
  }
  return false;
};

module.exports = { hasPathSum };
