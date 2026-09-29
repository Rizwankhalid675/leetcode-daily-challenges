/**
 * 23. Merge k Sorted Lists
 * https://leetcode.com/problems/merge-k-sorted-lists/
 * Divide and conquer without recursion: repeatedly merge lists in pairs (step 1, 2, 4, …) with the standard two-list merge, so each node takes part in O(log k) merges.
 */
var mergeKLists = function (lists) {
  const k = lists.length;
  if (k === 0) return null;
  const mergeTwo = (a, b) => {
    const dummy = new ListNode();
    let tail = dummy;
    while (a && b) {
      if (a.val <= b.val) {
        tail.next = a;
        a = a.next;
      } else {
        tail.next = b;
        b = b.next;
      }
      tail = tail.next;
    }
    tail.next = a || b;
    return dummy.next;
  };
  for (let step = 1; step < k; step *= 2) {
    for (let i = 0; i + step < k; i += 2 * step) lists[i] = mergeTwo(lists[i], lists[i + step]);
  }
  return lists[0];
};

module.exports = { mergeKLists };
