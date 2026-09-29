/**
 * 105. Construct Binary Tree from Preorder and Inorder Traversal
 * https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
 * Iterative O(n) build: keep a stack of nodes still waiting for a right child; each new preorder value becomes a left child, unless the stack top matches the next inorder value, in which case pop all matches and attach it as a right child of the last popped.
 */
var buildTree = function (preorder, inorder) {
  const root = new TreeNode(preorder[0]);
  const stack = [root];
  let j = 0;
  for (let i = 1; i < preorder.length; i++) {
    const node = new TreeNode(preorder[i]);
    let parent = stack[stack.length - 1];
    if (parent.val !== inorder[j]) {
      parent.left = node;
    } else {
      while (stack.length && stack[stack.length - 1].val === inorder[j]) {
        parent = stack.pop();
        j++;
      }
      parent.right = node;
    }
    stack.push(node);
  }
  return root;
};

module.exports = { buildTree };
