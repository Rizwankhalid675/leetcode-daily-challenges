/**
 * 206. Reverse Linked List
 * https://leetcode.com/problems/reverse-linked-list/
 *
 * Iterative: walk the list once, pointing each node back at the previous one.
 * (Iterative avoids recursion depth limits; see NOTES for the recursive version.)
 *
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
};

module.exports = { reverseList };
