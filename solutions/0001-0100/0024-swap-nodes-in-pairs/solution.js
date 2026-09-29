/**
 * 24. Swap Nodes in Pairs
 * https://leetcode.com/problems/swap-nodes-in-pairs/
 * Iterative relinking with a dummy head: for each pair (a, b) after prev, point prev→b→a→rest and advance prev to a.
 */
var swapPairs = function (head) {
  const dummy = new ListNode(0, head);
  let prev = dummy;
  while (prev.next && prev.next.next) {
    const a = prev.next;
    const b = a.next;
    a.next = b.next;
    b.next = a;
    prev.next = b;
    prev = a;
  }
  return dummy.next;
};

module.exports = { swapPairs };
