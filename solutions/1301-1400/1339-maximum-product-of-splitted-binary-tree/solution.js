/**
 * 1339. Maximum Product of Splitted Binary Tree
 * https://leetcode.com/problems/maximum-product-of-splitted-binary-tree/
 * Get every subtree sum with an iterative postorder. Cutting above a subtree with sum s gives
 * s * (total - s), which is largest when s is closest to total / 2 (an exact integer comparison).
 * The product can exceed 2^53, so the final multiply and mod use BigInt. The mod is taken only after maximizing.
 */
var maxProduct = function (root) {
  // Iterative preorder; reversing it visits children before parents.
  const order = [];
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    order.push(node);
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }
  const sum = new Map();
  for (let i = order.length - 1; i >= 0; i--) {
    const node = order[i];
    sum.set(node, node.val + (node.left ? sum.get(node.left) : 0) + (node.right ? sum.get(node.right) : 0));
  }
  const total = sum.get(root);
  // s * (total - s) is maximised by the s that minimises |total - 2s| (all values are exact integers).
  let best = 0, bestGap = Infinity;
  for (const node of order) {
    if (node === root) continue;
    const s = sum.get(node);
    const gap = Math.abs(total - 2 * s);
    if (gap < bestGap) { bestGap = gap; best = s; }
  }
  return Number((BigInt(best) * BigInt(total - best)) % 1000000007n);
};

module.exports = { maxProduct };
