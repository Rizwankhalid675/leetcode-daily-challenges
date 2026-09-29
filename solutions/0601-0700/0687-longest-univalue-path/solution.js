/**
 * 687. Longest Univalue Path
 * https://leetcode.com/problems/longest-univalue-path/
 * Post-order: for each node, the longest same-value arm going down is 1 + the child arm if the child has the same value. The best path through a node joins its left and right arms. Done iteratively.
 */
var longestUnivaluePath = function (root) {
  if (!root) return 0;
  const order = [];
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    order.push(node);
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }
  const arm = new Map();
  let best = 0;
  for (let i = order.length - 1; i >= 0; i--) {
    const node = order[i];
    let l = 0;
    let r = 0;
    if (node.left && node.left.val === node.val) l = arm.get(node.left) + 1;
    if (node.right && node.right.val === node.val) r = arm.get(node.right) + 1;
    if (l + r > best) best = l + r;
    arm.set(node, Math.max(l, r));
  }
  return best;
};

module.exports = { longestUnivaluePath };
