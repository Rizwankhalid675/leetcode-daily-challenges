# 24. Swap Nodes in Pairs

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | linked-list, recursion |
| Link | https://leetcode.com/problems/swap-nodes-in-pairs/ |
| Context | Study plan: Top 100 Liked |

## What it asks (own words)
Swap every two adjacent nodes of a linked list by relinking (not by changing values).

## Approach
A dummy node before the head removes the special case for the first pair. While two nodes `a`, `b` follow `prev`: `a.next = b.next`, `b.next = a`, `prev.next = b`, then `prev = a` (now the second of the pair).

## Edge cases
- Empty or single-node list: unchanged.
- Odd length: the last node stays in place.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Compared with swapping neighbours in an array; one test also checks node identity to confirm nodes are relinked rather than values swapped.

## Reusable pattern
**Dummy head + "prev" pointer for local relinking** (see also reverse-nodes-in-k-group).
