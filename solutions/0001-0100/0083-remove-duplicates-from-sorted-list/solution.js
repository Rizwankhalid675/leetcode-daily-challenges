/**
 * 83. Remove Duplicates from Sorted List
 * https://leetcode.com/problems/remove-duplicates-from-sorted-list/
 * Single pass: while the next node repeats the current value, splice it out; otherwise advance.
 */
var deleteDuplicates = function (head) {
  let cur = head;
  while (cur && cur.next) {
    if (cur.next.val === cur.val) cur.next = cur.next.next;
    else cur = cur.next;
  }
  return head;
};

module.exports = { deleteDuplicates };
