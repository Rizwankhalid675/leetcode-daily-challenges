# 1343. Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, sliding-window |
| Link | https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/ |
| Context | Quest: DSA / Recursion Maze / Assignment I (quiz) |

## What it asks (own words)
Count the length-k windows of an array whose average is at least a threshold.

## Key constraints
- Up to 10^5 elements, each up to 10^4; sums stay far below 2^53.

## Approach
Keep a running window sum: add the new element, drop the one that falls out. Compare the sum to `k * threshold` rather than dividing, so there is no floating-point comparison.

## Edge cases
- k equal to the array length: one window.
- threshold 0: every window counts.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Random arrays and parameters compared with recomputing each window's average directly.

## Reusable pattern
**Fixed-size sliding window, and compare sums instead of averages.**
