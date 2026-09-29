# 85. Maximal Rectangle

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | array, dynamic-programming, stack, matrix, monotonic-stack |
| Link | https://leetcode.com/problems/maximal-rectangle/ |
| Context | Quest: 2026 Spring Sprint / Week 3: Ascension / Ascension II |

## What it asks (own words)
In a 0/1 character grid, find the area of the biggest axis-aligned rectangle made only of '1' cells.

## Key constraints
- Up to 200×200; cells are the characters '0'/'1', not numbers.

## Approach
For each row r, let h[c] be the number of consecutive '1's ending at row r in column c. Any all-ones rectangle whose bottom edge is on row r fits under this histogram, so the answer is the max over rows of **Largest Rectangle in Histogram** (84):
- Keep a stack of columns with increasing heights.
- When a lower bar arrives, pop taller bars; each popped bar's widest rectangle spans from the new top of the stack + 1 to the current column − 1.
- A 0-height sentinel at column `cols` flushes the stack at the end of each row.

## Why it works
Every optimal rectangle has some bottom row and some limiting (shortest) column; that column's pop computes exactly its maximal width at that height.

## Edge cases
- All zeros → 0; single cell grids.
- Equal heights: popping on `>=` is fine, because the last equal bar gets the full width.

## Complexity
- Time: O(rows·cols)
- Space: O(cols)

## Testing note
Compared with an O(R²C²·RC) brute force on random grids up to 5×5 at varying densities, plus a 200×200 all-ones timing check.

## Reusable pattern
**2D → 1D reduction**: fix a bottom row, compress columns into heights, reuse the monotonic-stack histogram solver.
