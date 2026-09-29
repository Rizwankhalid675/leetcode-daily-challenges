/**
 * 147. Insertion Sort List
 * https://leetcode.com/problems/insertion-sort-list/
 * Insertion sort on a linked list with a dummy head. Keep a pointer to the last sorted node so already-in-order nodes cost O(1); otherwise walk from the dummy to the insertion point.
 */
var insertionSortList = function (head) {
  if (!head) return head;
  const dummy = new ListNode(0, head);
  let lastSorted = head;
  let cur = head.next;
  while (cur) {
    if (cur.val >= lastSorted.val) {
      lastSorted = cur;
    } else {
      lastSorted.next = cur.next;
      let prev = dummy;
      while (prev.next.val <= cur.val) prev = prev.next;
      cur.next = prev.next;
      prev.next = cur;
    }
    cur = lastSorted.next;
  }
  return dummy.next;
};

module.exports = { insertionSortList };
