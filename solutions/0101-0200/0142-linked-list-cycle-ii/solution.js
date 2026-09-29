/**
 * 142. Linked List Cycle II
 * https://leetcode.com/problems/linked-list-cycle-ii/
 * Floyd's tortoise and hare: after they meet, a pointer from the head and one from the meeting point, moving one step each, meet at the cycle entry.
 */
var detectCycle = function (head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      let p = head;
      while (p !== slow) {
        p = p.next;
        slow = slow.next;
      }
      return p;
    }
  }
  return null;
};

module.exports = { detectCycle };
