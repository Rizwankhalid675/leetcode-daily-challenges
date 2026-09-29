/**
 * 1019. Next Greater Node In Linked List
 * https://leetcode.com/problems/next-greater-node-in-linked-list/
 * Copy values to an array, then a monotonic decreasing stack of indices: each new value resolves every smaller value waiting on the stack.
 */
var nextLargerNodes = function (head) {
  const vals = [];
  for (let node = head; node; node = node.next) vals.push(node.val);
  const ans = new Array(vals.length).fill(0);
  const stack = [];
  for (let i = 0; i < vals.length; i++) {
    while (stack.length && vals[stack[stack.length - 1]] < vals[i]) ans[stack.pop()] = vals[i];
    stack.push(i);
  }
  return ans;
};

module.exports = { nextLargerNodes };
