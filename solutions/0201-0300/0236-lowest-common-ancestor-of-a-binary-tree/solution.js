/**
 * 236. Lowest Common Ancestor of a Binary Tree
 * https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
 *
 * Record every node's parent with an iterative traversal (up to 10^5 nodes, so no
 * recursion), collect p's ancestors (including p) in a Set, then walk up from q until
 * reaching one of them.
 *
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  const parent = new Map([[root, null]]);
  const stack = [root];
  while (!parent.has(p) || !parent.has(q)) {
    const node = stack.pop();
    if (node.left) {
      parent.set(node.left, node);
      stack.push(node.left);
    }
    if (node.right) {
      parent.set(node.right, node);
      stack.push(node.right);
    }
  }
  const ancestorsOfP = new Set();
  for (let n = p; n !== null; n = parent.get(n)) ancestorsOfP.add(n);
  let n = q;
  while (!ancestorsOfP.has(n)) n = parent.get(n);
  return n;
};

module.exports = { lowestCommonAncestor };
