/**
 * 92. Reverse Linked List II
 * https://leetcode.com/problems/reverse-linked-list-ii/
 * One pass with a dummy head: walk to the node before position left, then move each following node to the front of the sublist (head insertion) right - left times.
 */
var reverseBetween = function (head, left, right) {
  const dummy = new ListNode(0, head);
  let before = dummy;
  for (let i = 1; i < left; i++) before = before.next;
  const first = before.next;
  for (let i = left; i < right; i++) {
    const moved = first.next;
    first.next = moved.next;
    moved.next = before.next;
    before.next = moved;
  }
  return dummy.next;
};

module.exports = { reverseBetween };
