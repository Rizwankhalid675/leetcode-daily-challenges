/**
 * 226. Invert Binary Tree
 * https://leetcode.com/problems/invert-binary-tree/
 * Visit every node (BFS queue) and swap its left and right children.
 */
var invertTree = function (root) {
  const queue = [root];
  for (let h = 0; h < queue.length; h++) {
    const node = queue[h];
    if (!node) continue;
    const tmp = node.left;
    node.left = node.right;
    node.right = tmp;
    queue.push(node.left, node.right);
  }
  return root;
};

module.exports = { invertTree };
