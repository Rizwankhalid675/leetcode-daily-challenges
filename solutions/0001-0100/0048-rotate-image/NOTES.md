# 48. Rotate Image

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, math, matrix |
| Link | https://leetcode.com/problems/rotate-image/ |
| Study plan | Top Interview 150 (Matrix) |

## What it asks (own words)
Rotate an n×n matrix 90° clockwise in place, without allocating another matrix.

## Key constraints
- n ≤ 20, in place.

## Approach
**Transpose, then reverse each row.**

## Why it works
A clockwise rotation sends (i, j) to (j, n−1−i). Transposing sends (i, j) to (j, i), and reversing the row then sends
(j, i) to (j, n−1−i). Composed, that's exactly the rotation. Both steps are in-place swaps.

## Edge cases
- 1×1 is unchanged.
- Four rotations restore the original (tested for n = 1..20).

## Complexity
- Time: O(n²)
- Space: O(1)

## Alternatives
Rotate four cells at a time around each layer. It's also in place, but more index-heavy.

## Reusable pattern
**Decompose a geometric transform into simple reflections.** Transpose + row reverse = clockwise; transpose + column
reverse = counter-clockwise.
