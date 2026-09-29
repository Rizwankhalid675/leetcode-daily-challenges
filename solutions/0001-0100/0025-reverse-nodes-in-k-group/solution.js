/**
 * 25. Reverse Nodes in k-Group
 * https://leetcode.com/problems/reverse-nodes-in-k-group/
 * Iterative, O(1) extra space: check that k nodes remain, reverse that group with pointer flips, and stitch it between the previous group tail and the next group.
 */
var reverseKGroup = function (head, k) {
  const dummy = new ListNode(0, head);
  let groupPrev = dummy;
  for (;;) {
    let kth = groupPrev;
    for (let i = 0; i < k && kth; i++) kth = kth.next;
    if (!kth) break;
    const groupNext = kth.next;
    let prev = groupNext, cur = groupPrev.next;
    while (cur !== groupNext) {
      const nxt = cur.next;
      cur.next = prev;
      prev = cur;
      cur = nxt;
    }
    const oldFirst = groupPrev.next;
    groupPrev.next = kth;
    groupPrev = oldFirst;
  }
  return dummy.next;
};

module.exports = { reverseKGroup };
