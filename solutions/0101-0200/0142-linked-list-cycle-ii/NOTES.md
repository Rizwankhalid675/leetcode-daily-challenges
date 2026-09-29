# 142. Linked List Cycle II

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | hash-table, linked-list, two-pointers, floyds-cycle-finding-algorithm |
| Link | https://leetcode.com/problems/linked-list-cycle-ii/ |
| Context | Study plan: Top 100 Liked |

## What it asks (own words)
Return the node where a linked list's cycle begins, or null if there is no cycle — ideally with O(1) extra memory.

## Approach
1. Slow moves 1 step, fast moves 2. If fast runs out, there's no cycle.
2. When they meet, start a new pointer at the head and move it and the slow pointer one step at a time; they meet at the entry.

## Why it works
Let a = head-to-entry distance, b = entry-to-meeting distance, c = cycle length. Fast has gone twice as far: `2(a + b) = a + b + k·c`, so `a = k·c − b`. Walking a steps from the meeting point lands exactly on the entry — the same place a walk of a steps from the head lands.

## Edge cases
- Empty list, single node without cycle → null.
- A node pointing to itself → that node.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Lists are built with the tail wired to index `pos`; the result is checked by **node identity**, over random lengths and positions, including 10⁴ nodes.

## Reusable pattern
**Floyd cycle detection + entry finding** (also solves find-the-duplicate-number, 287).
