/**
 * 19. Remove Nth Node From End of List
 * https://leetcode.com/problems/remove-nth-node-from-end-of-list/
 * Two pointers from a dummy head: move the lead n + 1 steps ahead, then advance both until the lead falls off; the trailing pointer is just before the node to delete.
 */
var removeNthFromEnd = function (head, n) {
  const dummy = new ListNode(0, head);
  let lead = dummy, trail = dummy;
  for (let i = 0; i <= n; i++) lead = lead.next;
  while (lead) {
    lead = lead.next;
    trail = trail.next;
  }
  trail.next = trail.next.next;
  return dummy.next;
};

module.exports = { removeNthFromEnd };
