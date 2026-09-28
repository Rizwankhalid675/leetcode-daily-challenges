# 724. Find Pivot Index

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, prefix-sum |
| Link | https://leetcode.com/problems/find-pivot-index/ |
| Study plan | LeetCode 75 (Prefix Sum) |

## What it asks (own words)
Find the leftmost index where the sum of everything to its left equals the sum of everything to its right (the
element itself is excluded). Return −1 if there is none.

## Key constraints
- n ≤ 10⁴, values in ±1000, and negative values are allowed.

## Approach
Compute the total once. Scanning left to right with a running `leftSum`, the right sum is
`total − leftSum − nums[i]`. Return the first i where they're equal.

## Why it works
The left part, the element and the right part partition the array, so the right sum follows from the other two in
O(1).

## Edge cases
- Pivot at index 0 (left sum is 0) or at the last index (right sum is 0).
- Several pivots (e.g. all zeros): the scan returns the leftmost.
- Negative numbers break any "two pointers from both ends" idea, but the prefix approach doesn't care.

## Complexity
- Time: O(n)
- Space: O(1)

## Reusable pattern
**Total minus prefix gives suffix.** One pass for the total, one for the prefix, and every "left vs right" query is
O(1).
