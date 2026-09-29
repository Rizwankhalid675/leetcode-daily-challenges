# 221. Maximal Square

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, dynamic-programming, matrix |
| Link | https://leetcode.com/problems/maximal-square/ |
| Context | Quest: DSA / Strategy Summit / Assignment (quiz) |

## What it asks (own words)
In a 0/1 character grid, find the area of the biggest square made only of '1's.

## Approach
Let side(i, j) be the largest all-'1' square whose bottom-right corner is (i, j). If the cell is '1', side = 1 + min(up, left, up-left), otherwise 0. Keep one row: before overwriting `dp[j+1]`, it holds "up". `dp[j]` (already updated) is "left", and the saved `diag` is "up-left".

## Why it works
A square of side s ending at (i, j) needs squares of side s − 1 ending at the three neighbours, and those three overlapping squares together with the corner cell cover the s × s square exactly. So the smallest of the three limits the side.

## Edge cases
- Cells are the **strings** '1' / '0', not numbers, so compare with '1'.
- Return the area (side²), not the side.

## Complexity
- Time: O(m · n)
- Space: O(n)

## Testing note
Compared with a brute force that checks every square on random grids, plus a 300 × 300 all-ones grid.

## Reusable pattern
**Corner-anchored DP with min of three neighbours** (compare 1277 Count Square Submatrices, which sums these values instead of taking the max).
