/**
 * 61. Rotate List
 * https://leetcode.com/problems/rotate-list/
 * Measure the length, reduce k modulo it, close the list into a ring, and cut it after node len - k.
 */
var rotateRight = function (head, k) {
  if (!head || !head.next) return head;
  let len = 1, tail = head;
  while (tail.next) { tail = tail.next; len++; }
  k %= len;
  if (k === 0) return head;
  let newTail = head;
  for (let i = 1; i < len - k; i++) newTail = newTail.next;
  const newHead = newTail.next;
  newTail.next = null;
  tail.next = head;
  return newHead;
};

module.exports = { rotateRight };
