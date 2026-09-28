/**
 * 328. Odd Even Linked List
 * https://leetcode.com/problems/odd-even-linked-list/
 *
 * Relink in place: walk two chains (odd positions, even positions) by skipping one node
 * each step, then attach the even chain after the last odd node.
 *
 * @param {ListNode} head
 * @return {ListNode}
 */
var oddEvenList = function (head) {
  if (head === null) return null;
  let odd = head;
  const evenHead = head.next;
  let even = evenHead;
  while (even !== null && even.next !== null) {
    odd.next = even.next;
    odd = odd.next;
    even.next = odd.next;
    even = even.next;
  }
  odd.next = evenHead;
  return head;
};

module.exports = { oddEvenList };
