# 206. Reverse Linked List

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | linked-list, recursion |
| Link | https://leetcode.com/problems/reverse-linked-list/ |
| Study plan | LeetCode 75 (Linked List) |

## What it asks (own words)
Reverse a singly linked list and return the new head.

## Key constraints
- 0 to 5000 nodes.

## Approach (iterative)
Three pointers: `prev`, `curr`, and a saved `next`. For each node, save its next, point it back to `prev`, then
advance. At the end `prev` is the new head.

## Why it works
Invariant: `prev` is the head of the already-reversed prefix and `curr` is the head of the untouched suffix. Each step
moves one node from the suffix to the front of the prefix.

## Recursive alternative
```js
const reverse = (node) => {
  if (!node || !node.next) return node;
  const newHead = reverse(node.next);
  node.next.next = node; // the node after me now points back to me
  node.next = null;
  return newHead;
};
```
It's elegant, but it uses O(n) call-stack space. Node.js overflows at roughly 10⁴ frames (about 12,500 measured
locally), so for long lists prefer the iterative form.

## Edge cases
- Empty list → null. A single node → itself.
- Forgetting to save `next` before overwriting `curr.next` loses the rest of the list. That's the classic bug.

## Complexity
- Time: O(n)
- Space: O(1) iterative, O(n) recursive

## Reusable pattern
**prev/curr/next pointer dance.** It's a sub-step of many list problems (2130, 234, 92, 25).
