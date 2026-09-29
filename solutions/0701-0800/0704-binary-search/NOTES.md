# 704. Binary Search

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, binary-search |
| Link | https://leetcode.com/problems/binary-search/ |
| Context | Quest: DSA / Sorting Plateau / Binary Search |

## What it asks (own words)
Find a target's index in a sorted array of distinct numbers in O(log n), or −1.

## Approach
Keep a closed window [lo, hi]. Compare the middle element with the target and discard the half that can't contain it. The window empties only if the target is absent.

## Complexity
- Time: O(log n)
- Space: O(1)

## Testing note
Random sorted distinct arrays compared with `indexOf`, including targets outside the range.

## Reusable pattern
**Closed-interval template**: `while (lo <= hi)`, move to `mid ± 1`.
