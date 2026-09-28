# 36. Valid Sudoku

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, hash-table, matrix |
| Link | https://leetcode.com/problems/valid-sudoku/ |
| Study plan | Top Interview 150 (Matrix) |

## What it asks (own words)
Check a partially filled 9×9 Sudoku board: no digit may repeat within any row, column or 3×3 box. The board doesn't
need to be solvable.

## Key constraints
- A fixed 9×9 board.

## Approach
One pass over the filled cells, with a Set of seen digits for each row, column and box. The box index is
`⌊r/3⌋·3 + ⌊c/3⌋`. Any digit already present in one of its three sets means the board is invalid.

## Why it works
Each rule is exactly "no duplicates within a group", and every cell belongs to one row, one column and one box.

## Edge cases
- An empty board is valid.
- A box conflict where the two cells share neither a row nor a column (tested separately).

## Complexity
- Time: O(81) = O(1)
- Space: O(1)

## Reusable pattern
**Group-membership checks with computed group keys** (row, column, `⌊r/3⌋·3 + ⌊c/3⌋`). The same box formula is used in
Sudoku Solver (37).
