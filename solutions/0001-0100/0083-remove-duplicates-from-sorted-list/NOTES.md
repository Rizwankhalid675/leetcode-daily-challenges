# 83. Remove Duplicates from Sorted List

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | linked-list |
| Link | https://leetcode.com/problems/remove-duplicates-from-sorted-list/ |
| Context | Quest: DSA / Association Slope / Linked List |

## What it asks (own words)
A sorted linked list may contain runs of equal values; keep exactly one node per value.

## Approach
Because the list is sorted, duplicates are adjacent. Stand on a node; while its successor has the same value, unlink the successor. Only move forward once the successor differs.

## Edge cases
- Empty list, a single node, or the whole list being one value.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Random sorted arrays compared with `[...new Set(a)]` (which preserves first-occurrence order).

## Reusable pattern
**Don't advance the pointer after a deletion**: re-check the new neighbour first.
