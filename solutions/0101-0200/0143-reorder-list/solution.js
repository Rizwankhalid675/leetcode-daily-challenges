/**
 * 143. Reorder List
 * https://leetcode.com/problems/reorder-list/
 * Find the middle with slow/fast pointers, reverse the second half, then interleave the two halves.
 * Everything is iterative, O(1) extra space.
 */
var reorderList = function (head) {
  if (!head || !head.next) return;
  let slow = head, fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  let prev = null, cur = slow.next;
  slow.next = null;
  while (cur) {
    const nxt = cur.next;
    cur.next = prev;
    prev = cur;
    cur = nxt;
  }
  let a = head, b = prev;
  while (b) {
    const an = a.next, bn = b.next;
    a.next = b;
    b.next = an;
    a = an;
    b = bn;
  }
};

module.exports = { reorderList };
