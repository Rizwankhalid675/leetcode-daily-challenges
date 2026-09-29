# 141. Linked List Cycle

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | hash-table, linked-list, two-pointers |
| Link | https://leetcode.com/problems/linked-list-cycle/ |
| Study plan | Top Interview 150 (Linked List) |

## What it asks (own words)
Does following `next` pointers from the head ever revisit a node?

## Key constraints
- Up to 10⁴ nodes. The follow-up asks for O(1) memory.

## Approach
Floyd's tortoise and hare: slow moves one step, fast moves two. If they meet, there's a cycle. If fast reaches the end,
there isn't.

## Why it works
Once both pointers are inside the cycle, the gap between them shrinks by one node per step (modulo the cycle length),
so they must meet within one lap. Without a cycle, fast hits null.

## Edge cases
- An empty list, a single node, or a self-loop (pos = 0 with n = 1).
- All lengths up to 12 with every cycle position are tested.

## Complexity
- Time: O(n)
- Space: O(1)

## Alternatives
A Set of visited nodes: O(n) memory.

## Reusable pattern
**Floyd's cycle detection** (compare 202 Happy Number). The follow-up to find the cycle's start (142) resets one
pointer to the head and walks both at speed one.
