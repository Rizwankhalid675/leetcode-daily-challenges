/**
 * 160. Intersection of Two Linked Lists
 * https://leetcode.com/problems/intersection-of-two-linked-lists/
 * Two pointers that switch to the other list's head when they run out: both travel lenA + lenB and so arrive at the shared node (or null) together.
 */
var getIntersectionNode = function (headA, headB) {
  let a = headA, b = headB;
  while (a !== b) {
    a = a ? a.next : headB;
    b = b ? b.next : headA;
  }
  return a;
};

module.exports = { getIntersectionNode };
