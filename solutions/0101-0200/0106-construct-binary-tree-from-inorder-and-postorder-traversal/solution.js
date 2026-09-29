/**
 * 106. Construct Binary Tree from Inorder and Postorder Traversal
 * https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/
 * Iterative build: walk postorder backwards (root, right, left) with a stack; while the stack top equals the current inorder element (scanned right to left) pop it, and the next value becomes the left child of the last popped node, otherwise the right child of the top.
 */
var buildTree = function (inorder, postorder) {
  const n = postorder.length;
  if (n === 0) return null;
  const root = new TreeNode(postorder[n - 1]);
  const stack = [root];
  let j = n - 1;
  for (let i = n - 2; i >= 0; i--) {
    const node = new TreeNode(postorder[i]);
    let top = stack[stack.length - 1];
    if (top.val !== inorder[j]) {
      top.right = node;
    } else {
      while (stack.length && stack[stack.length - 1].val === inorder[j]) {
        top = stack.pop();
        j--;
      }
      top.left = node;
    }
    stack.push(node);
  }
  return root;
};

module.exports = { buildTree };
