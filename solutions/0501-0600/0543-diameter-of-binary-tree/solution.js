/**
 * 543. Diameter of Binary Tree
 * https://leetcode.com/problems/diameter-of-binary-tree/
 * Post-order heights: the longest path bending at a node is height(left) + height(right) in edges. Done iteratively so skewed trees cannot overflow the stack.
 */
var diameterOfBinaryTree = function (root) {
  if (!root) return 0;
  const order = [];
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    order.push(node);
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }
  const depth = new Map(); // number of nodes on the longest downward path
  let best = 0;
  for (let i = order.length - 1; i >= 0; i--) {
    const node = order[i];
    const l = node.left ? depth.get(node.left) : 0;
    const r = node.right ? depth.get(node.right) : 0;
    if (l + r > best) best = l + r;
    depth.set(node, 1 + Math.max(l, r));
  }
  return best;
};

module.exports = { diameterOfBinaryTree };
