/**
 * 2196. Create Binary Tree From Descriptions
 * https://leetcode.com/problems/create-binary-tree-from-descriptions/
 * Create (or reuse) a node per value from a map, wire each child to its parent, and remember which values appear as children; the one parent that is never a child is the root.
 */
var createBinaryTree = function (descriptions) {
  const nodes = new Map();
  const isChild = new Set();
  const get = (v) => {
    let node = nodes.get(v);
    if (!node) { node = new TreeNode(v); nodes.set(v, node); }
    return node;
  };
  for (const [p, c, isLeft] of descriptions) {
    const parent = get(p);
    const child = get(c);
    if (isLeft === 1) parent.left = child; else parent.right = child;
    isChild.add(c);
  }
  for (const [p] of descriptions) if (!isChild.has(p)) return nodes.get(p);
  return null;
};

module.exports = { createBinaryTree };
