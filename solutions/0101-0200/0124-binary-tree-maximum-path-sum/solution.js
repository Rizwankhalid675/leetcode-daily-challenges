/**
 * 124. Binary Tree Maximum Path Sum
 * https://leetcode.com/problems/binary-tree-maximum-path-sum/
 * Iterative postorder (reversed preorder) computing each node's best downward gain max(0, left) + value; the best path through a node uses both non-negative gains.
 */
var maxPathSum = function (root) {
  const order = [], stack = [root];
  while (stack.length) {
    const node = stack.pop();
    order.push(node);
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }
  const gain = new Map();
  let best = -Infinity;
  for (let i = order.length - 1; i >= 0; i--) {
    const node = order[i];
    const l = node.left ? Math.max(0, gain.get(node.left)) : 0;
    const r = node.right ? Math.max(0, gain.get(node.right)) : 0;
    best = Math.max(best, node.val + l + r);
    gain.set(node, node.val + Math.max(l, r));
  }
  return best;
};

module.exports = { maxPathSum };
