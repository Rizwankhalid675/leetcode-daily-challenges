/**
 * 2. Add Two Numbers
 * https://leetcode.com/problems/add-two-numbers/
 *
 * Grade-school addition over digits stored least-significant first, with a carry.
 * Continue while either list has digits or a carry remains.
 *
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  const dummy = { val: 0, next: null };
  let tail = dummy;
  let carry = 0;
  while (l1 !== null || l2 !== null || carry > 0) {
    const sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry;
    carry = sum >= 10 ? 1 : 0;
    tail.next = new ListNode(sum % 10);
    tail = tail.next;
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }
  return dummy.next;
};

module.exports = { addTwoNumbers };
