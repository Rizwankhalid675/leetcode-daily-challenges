# 1476. Subrectangle Queries

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, design, matrix |
| Link | https://leetcode.com/problems/subrectangle-queries/ |
| Context | Quest: System & Software Design / Comprehensive Data Operation Simulation Station / Comprehensive Data Operations Simulation |

## What it asks (own words)
Hold a grid of numbers. Support overwriting every cell of a sub-rectangle with one value, and reading a single cell.

## Key constraints
- At most 500 operations in total, grid at most 100 × 100.

## Approach
Don't paint the grid. Append each update `[r1, c1, r2, c2, v]` to a log (O(1)). To read a cell, walk the log from the newest update backwards; the first one whose rectangle contains the cell decides the value. If none does, the original grid value stands.

Painting directly (O(rows · cols) per update, O(1) per read) would also pass: 500 × 10⁴ = 5·10⁶ cell writes. The log version trades cheap updates for reads that cost O(number of updates), which suits this problem's small operation count.

## Edge cases
- Overlapping updates: the newest wins, which the backward scan guarantees.
- Reads before any update return the original value.

## Complexity
- Time: O(1) per update, O(U) per read (U = updates so far ≤ 500)
- Space: O(U)

## Testing note
Compared with actually painting a copy of the grid under random update/read sequences.

## Reusable pattern
**Lazy update log, newest first**: when updates are few, store them and resolve reads by the latest update that covers the point.
