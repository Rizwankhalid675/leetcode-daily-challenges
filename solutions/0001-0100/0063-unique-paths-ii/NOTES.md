# 63. Unique Paths II

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, dynamic-programming, matrix |
| Link | https://leetcode.com/problems/unique-paths-ii/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Count the right/down paths from the top-left to the bottom-right of a grid, avoiding obstacle cells (1s).

## Approach
One array over columns. Start with `dp[0] = 1` (one way to stand at the start). For every row and column: an obstacle zeroes the count; otherwise add the count from the left (`dp[c−1]`, already updated this row) to the count from above (the value `dp[c]` still holds).

## Edge cases
- Obstacle on the start or end cell: 0.
- A 1×1 open grid: 1.

## Why the numbers stay exact
The answer is guaranteed ≤ 2·10⁹. Any cell that can reach the end contributes at least its own count to the answer, so those counts are ≤ 2·10⁹ too. Cells that can't reach the end may grow large, but they never feed into the answer.

## Complexity
- Time: O(m·n)
- Space: O(n)

## Testing note
Compared with a plain recursive path count on random grids with about 20% obstacles.

## Reusable pattern
**Grid path counting with a rolling row**, where obstacles reset the count to zero.
