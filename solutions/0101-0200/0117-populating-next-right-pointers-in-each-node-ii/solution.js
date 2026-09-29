/**
 * 117. Populating Next Right Pointers in Each Node II
 * https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/
 * Constant extra space: walk each level through the next pointers already set, and link the children into the next level with a dummy head and a tail pointer.
 */
var connect = function (root) {
  let levelStart = root;
  while (levelStart) {
    const dummy = { next: null };
    let tail = dummy;
    for (let node = levelStart; node; node = node.next) {
      if (node.left) tail = tail.next = node.left;
      if (node.right) tail = tail.next = node.right;
    }
    levelStart = dummy.next;
  }
  return root;
};

module.exports = { connect };
