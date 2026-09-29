# 64. Minimum Path Sum

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, dynamic-programming, matrix |
| Link | https://leetcode.com/problems/minimum-path-sum/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Move from the top-left to the bottom-right of a grid of non-negative numbers, only right or down. Minimize the sum of visited cells.

## Approach
`dp[c]` holds the best sum to reach column `c` of the current row. For each row: the first column can only come from above (`dp[0] += row[0]`); every other column takes the cheaper of above (the old `dp[c]`) or left (the freshly updated `dp[c−1]`), plus the cell.

Initializing `dp = [0, ∞, ∞, …]` makes the first row come out right with no special case (only "from the left" is finite there).

## Edge cases
- A single row or single column.

## Complexity
- Time: O(m·n)
- Space: O(n)

## Testing note
Compared with an exhaustive recursive search over all right/down paths on random small grids.

## Reusable pattern
**Rolling 1-D grid DP**: "above" is the old value in the same slot, "left" is the new value in the previous slot.
