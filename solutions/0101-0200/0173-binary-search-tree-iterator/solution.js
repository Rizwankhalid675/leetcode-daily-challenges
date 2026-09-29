/**
 * 173. Binary Search Tree Iterator
 * https://leetcode.com/problems/binary-search-tree-iterator/
 * Controlled in-order traversal: keep a stack of the left spine; next() pops the smallest node and pushes the left spine of its right subtree. Amortized O(1), O(h) memory.
 */
var BSTIterator = function (root) {
  this.stack = [];
  this._pushLeft(root);
};

BSTIterator.prototype._pushLeft = function (node) {
  while (node) {
    this.stack.push(node);
    node = node.left;
  }
};

BSTIterator.prototype.next = function () {
  const node = this.stack.pop();
  this._pushLeft(node.right);
  return node.val;
};

BSTIterator.prototype.hasNext = function () {
  return this.stack.length > 0;
};

module.exports = { BSTIterator };
