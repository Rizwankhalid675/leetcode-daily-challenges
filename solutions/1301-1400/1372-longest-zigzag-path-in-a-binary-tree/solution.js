/**
 * 1372. Longest ZigZag Path in a Binary Tree
 * https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree/
 *
 * Iterative DFS carrying (node, direction of the step that reached it, zigzag length so far).
 * Stepping in the opposite direction extends the zigzag; stepping in the same direction
 * starts a new zigzag of length 1 from the parent. n <= 5*10^4, so no recursion.
 *
 * @param {TreeNode} root
 * @return {number}
 */
var longestZigZag = function (root) {
  let best = 0;
  // dir: 'L' if we arrived here by moving left, 'R' if right, null at the root
  const stack = [[root, null, 0]];
  while (stack.length > 0) {
    const [node, dir, len] = stack.pop();
    if (len > best) best = len;
    if (node.left) stack.push([node.left, 'L', dir === 'R' ? len + 1 : 1]);
    if (node.right) stack.push([node.right, 'R', dir === 'L' ? len + 1 : 1]);
  }
  return best;
};

module.exports = { longestZigZag };
