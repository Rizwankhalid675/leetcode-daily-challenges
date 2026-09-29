# 160. Intersection of Two Linked Lists

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | hash-table, linked-list, two-pointers |
| Link | https://leetcode.com/problems/intersection-of-two-linked-lists/ |
| Context | Study plan: Top 100 Liked |

## What it asks (own words)
Two singly linked lists may merge into a common tail. Return the first shared node (by identity), or null. Don't modify the lists.

## Approach
Pointer `a` walks A then B; pointer `b` walks B then A. Loop until they are the same reference.

## Why it works
With private lengths x, y and shared length z, both pointers reach the merge node after x + y + z steps. If there's no merge, both reach `null` after x + y steps and the loop ends with `null`.

## Edge cases
- The merge is at a head (one list is a suffix of the other).
- Equal values in different nodes are not an intersection.

## Complexity
- Time: O(m + n)
- Space: O(1)

## Testing note
Tests build real shared tails (the same node objects appended to both lists) and compare by identity; random shapes, identical-value decoys and max-length lists are covered.

## Reusable pattern
**Equalize path lengths by swapping starts** — two pointers that each walk both lists.
