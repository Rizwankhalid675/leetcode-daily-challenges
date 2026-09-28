/**
 * 872. Leaf-Similar Trees
 * https://leetcode.com/problems/leaf-similar-trees/
 *
 * Collect each tree's leaves left-to-right with an iterative DFS (push right before left
 * so the left subtree is visited first), then compare the sequences.
 *
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function (root1, root2) {
  const leaves = (root) => {
    const out = [];
    const stack = [root];
    while (stack.length > 0) {
      const node = stack.pop();
      if (node.left === null && node.right === null) out.push(node.val);
      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);
    }
    return out;
  };
  const a = leaves(root1);
  const b = leaves(root2);
  return a.length === b.length && a.every((v, i) => v === b[i]);
};

module.exports = { leafSimilar };
