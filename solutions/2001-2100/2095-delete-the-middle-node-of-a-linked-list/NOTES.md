# 2095. Delete the Middle Node of a Linked List

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | linked-list, two-pointers |
| Link | https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/ |
| Study plan | LeetCode 75 (Linked List) |

## What it asks (own words)
Remove node number ⌊n/2⌋ (0-based) from a singly linked list of unknown length and return the head.

## Key constraints
- Up to 10⁵ nodes. One pass is ideal, but two passes (count, then walk) would also be O(n).

## Approach
Slow/fast pointers, with **fast starting two nodes ahead** (`head.next.next`). When fast reaches the end, slow is at
index ⌊n/2⌋ − 1, the node *before* the middle, which is exactly where the unlinking must happen. The single-node list
is special: its only node is the middle, so the result is empty.

## Why it works
Fast moves two steps per slow step, starting 2 ahead. After k iterations slow is at index k and fast at 2k + 2. The
loop stops when fast can't advance two more steps, which leaves slow at ⌊n/2⌋ − 1 for every n ≥ 2. The test checks
every length from 1 to 20.

## Edge cases
- n = 1 → null.
- n = 2 → delete the second node.
- Even versus odd lengths: the middle is ⌊n/2⌋, so the *second* middle for even n.

## Complexity
- Time: O(n)
- Space: O(1)

## Reusable pattern
**Fast/slow pointers with an offset start** to land exactly one node *before* a target, which singly linked deletion
needs. Checking all small lengths exhaustively is the best way to verify pointer arithmetic.
