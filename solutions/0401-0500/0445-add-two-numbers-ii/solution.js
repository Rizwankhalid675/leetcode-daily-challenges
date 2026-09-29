/**
 * 445. Add Two Numbers II
 * https://leetcode.com/problems/add-two-numbers-ii/
 * Push both lists' digits onto stacks, then pop and add from the least significant end, prepending each new node; the inputs are not reversed.
 */
var addTwoNumbers = function (l1, l2) {
  const s1 = [], s2 = [];
  for (let p = l1; p; p = p.next) s1.push(p.val);
  for (let p = l2; p; p = p.next) s2.push(p.val);
  let head = null, carry = 0;
  while (s1.length || s2.length || carry) {
    const sum = (s1.length ? s1.pop() : 0) + (s2.length ? s2.pop() : 0) + carry;
    head = new ListNode(sum % 10, head);
    carry = sum >= 10 ? 1 : 0;
  }
  return head;
};

module.exports = { addTwoNumbers };
