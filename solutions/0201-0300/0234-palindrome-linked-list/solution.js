/**
 * 234. Palindrome Linked List
 * https://leetcode.com/problems/palindrome-linked-list/
 * Find the middle with slow/fast pointers, reverse the second half in place, compare halves, then reverse it back. Fully iterative (up to 10^5 nodes).
 */
var isPalindrome = function (head) {
  const reverse = (node) => {
    let prev = null;
    while (node) {
      const next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }
    return prev;
  };
  let slow = head, fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  const secondHead = reverse(slow.next);
  let ok = true;
  for (let p = head, q = secondHead; q; p = p.next, q = q.next) {
    if (p.val !== q.val) {
      ok = false;
      break;
    }
  }
  slow.next = reverse(secondHead); // restore the input
  return ok;
};

module.exports = { isPalindrome };
