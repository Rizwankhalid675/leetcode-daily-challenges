# 52. N-Queens II

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | backtracking, algorithm-x |
| Link | https://leetcode.com/problems/n-queens-ii/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Count the ways to place n non-attacking queens on an n×n board.

## Approach
Place one queen per row. Track attacked columns and diagonals as bitmasks:
- `cols`: columns already used.
- `diagL` / `diagR`: squares attacked in the current row along each diagonal direction; moving down one row shifts them left/right by one.
- Free squares = `full & ~(cols | diagL | diagR)`. Take the lowest free bit with `free & -free`, recurse, repeat.

When all column bits are set, one full placement has been found.

## Complexity
- Time: O(n!) worst-case bound, tiny for n ≤ 9
- Space: O(n) recursion

## Testing note
Checked against the known sequence (1, 0, 0, 2, 10, 4, 40, 92, 352) and an independent array-based backtracker for every allowed n.

## Reusable pattern
**Bitmask backtracking**: represent "which choices are blocked" as integers so each step is a few bit operations.
