# 931. Minimum Falling Path Sum

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, dynamic-programming, matrix |
| Link | https://leetcode.com/problems/minimum-falling-path-sum/ |
| Context | Study plan: Dynamic Programming |

## What it asks (own words)
Walk from any cell of the top row to the bottom row of a square grid, each step going straight down or diagonally down one column. Minimize the sum of visited cells.

## Approach
Let `best[j]` be the cheapest path ending at column j of the current row. For the next row, each cell adds its own value to the minimum of the (up to) three cells above it. Keep only one previous row. The answer is the minimum over the last row.

## Edge cases
- n = 1: the single value (may be negative).
- Edge columns only have two parents.

## Complexity
- Time: O(n²)
- Space: O(n)

## Testing note
Compared with a DFS over every falling path on random grids up to 5×5 with values in [-100, 100].

## Reusable pattern
**Grid path DP with a rolling row** whenever each cell depends only on the row above.
