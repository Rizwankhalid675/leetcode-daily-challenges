/**
 * 2130. Maximum Twin Sum of a Linked List
 * https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/
 *
 * Find the middle with slow/fast pointers, reverse the second half in place, then walk
 * both halves together: the k-th node of each half are twins.
 *
 * @param {ListNode} head
 * @return {number}
 */
var pairSum = function (head) {
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  // reverse the second half starting at slow
  let prev = null;
  while (slow !== null) {
    const next = slow.next;
    slow.next = prev;
    prev = slow;
    slow = next;
  }
  let best = 0;
  for (let a = head, b = prev; b !== null; a = a.next, b = b.next) {
    best = Math.max(best, a.val + b.val);
  }
  return best;
};

module.exports = { pairSum };
