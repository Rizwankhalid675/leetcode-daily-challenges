/**
 * 82. Remove Duplicates from Sorted List II
 * https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/
 * Dummy head plus a tail pointer: scan runs of equal values and link a node into the result only when its run has length one.
 */
var deleteDuplicates = function (head) {
  const dummy = new ListNode(0);
  let tail = dummy, cur = head;
  while (cur) {
    if (cur.next && cur.next.val === cur.val) {
      const v = cur.val;
      while (cur && cur.val === v) cur = cur.next;
    } else {
      tail.next = cur;
      tail = cur;
      cur = cur.next;
    }
  }
  tail.next = null;
  return dummy.next;
};

module.exports = { deleteDuplicates };
