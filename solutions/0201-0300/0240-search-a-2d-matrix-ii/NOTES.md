# 240. Search a 2D Matrix II

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, binary-search, divide-and-conquer, matrix |
| Link | https://leetcode.com/problems/search-a-2d-matrix-ii/ |
| Context | Study plan: Top 100 Liked |

## What it asks (own words)
Each row and each column of a matrix is sorted ascending. Is `target` present?

## Approach
Start at the top-right. Everything below it in the column is larger, everything left of it in the row is smaller. If the value is too large, the whole column is useless → move left. If too small, the whole row is useless → move down.

## Edge cases
- 1×1 matrix; target smaller than everything or larger than everything (the walk exits the grid).

## Complexity
- Time: O(m + n)
- Space: O(1)

## Testing note
Compared with a full scan on random matrices built so rows and columns are non-decreasing, plus a 300×300 case.

## Reusable pattern
**Staircase search** from a corner where one direction increases and the other decreases.
