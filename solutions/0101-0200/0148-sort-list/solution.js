/**
 * 148. Sort List
 * https://leetcode.com/problems/sort-list/
 * Bottom-up merge sort: merge sorted runs of length 1, 2, 4, ... in place by relinking nodes.
 * O(n log n) time, O(1) extra space, and no recursion (lists can have 5*10^4 nodes).
 */
var sortList = function (head) {
  // Cut the list after 'size' nodes; return the head of the remainder.
  const split = (node, size) => {
    for (let i = 1; node && i < size; i++) node = node.next;
    if (!node) return null;
    const rest = node.next;
    node.next = null;
    return rest;
  };
  // Merge two sorted lists after 'tail'; return the last node of the merged run.
  const merge = (a, b, tail) => {
    while (a && b) {
      if (a.val <= b.val) { tail.next = a; a = a.next; } else { tail.next = b; b = b.next; }
      tail = tail.next;
    }
    tail.next = a || b;
    while (tail.next) tail = tail.next;
    return tail;
  };
  let length = 0;
  for (let p = head; p; p = p.next) length++;
  const dummy = new ListNode(0, head);
  for (let size = 1; size < length; size *= 2) {
    let tail = dummy, cur = dummy.next;
    while (cur) {
      const left = cur;
      const right = split(left, size);
      cur = split(right, size);
      tail = merge(left, right, tail);
    }
  }
  return dummy.next;
};

module.exports = { sortList };
