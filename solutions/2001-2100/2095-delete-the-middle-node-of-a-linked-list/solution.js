/**
 * 2095. Delete the Middle Node of a Linked List
 * https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/
 *
 * Slow/fast pointers, with fast starting two steps ahead so that slow stops on the node
 * BEFORE the middle (index floor(n/2) - 1); then unlink slow.next.
 *
 * Definition for singly-linked list (provided by LeetCode):
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 *
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteMiddle = function (head) {
  if (head.next === null) return null; // single node: it is the middle
  let slow = head;
  let fast = head.next.next;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  slow.next = slow.next.next;
  return head;
};

module.exports = { deleteMiddle };
