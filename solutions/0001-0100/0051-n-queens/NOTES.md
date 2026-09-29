# 51. N-Queens

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | array, backtracking, algorithm-x |
| Link | https://leetcode.com/problems/n-queens/ |
| Context | Study plan: Top 100 Liked |

## What it asks (own words)
List every way to put n queens on an n×n board so that no two share a row, column or diagonal, drawn as strings.

## Key constraints
- n ≤ 9 (at most 352 solutions), so plain backtracking is plenty.

## Approach
Place one queen per row. Keep three "taken" arrays: columns, the `r + c` diagonals and the `r − c` anti-diagonals (shifted by n to stay non-negative). Try each free column, mark, recurse into the next row, unmark. When row n is reached, render the recorded columns as strings.

## Edge cases
- n = 2 and n = 3 have no solutions (empty list).
- n = 1 is a single `"Q"`.

## Complexity
- Time: O(n!) worst-case search, far less in practice thanks to pruning
- Space: O(n) for the recursion and marks (plus the output)

## Testing note
Checked the known counts 1, 0, 0, 2, 10, 4, 40, 92, 352 for n = 1..9, and verified every returned board independently (one queen per row, no shared column or diagonal, no duplicates).

## Reusable pattern
**Backtracking with O(1) conflict arrays** — index diagonals by `r + c` and `r − c`.
