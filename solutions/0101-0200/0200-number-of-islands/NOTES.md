# 200. Number of Islands

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, depth-first-search, breadth-first-search, union-find, matrix |
| Link | https://leetcode.com/problems/number-of-islands/ |
| Context | Quest: 2026 Spring Sprint / Week 1: Practice / Practice II |

## What it asks (own words)
Given a grid of land ('1') and water ('0'), count the groups of land cells connected horizontally or vertically.

## Key constraints
- Up to 300 x 300 cells, so a single island can have 90,000 cells. A recursive flood fill could go that deep, which is risky in JS.
- Cells are the characters '1' and '0', not numbers.

## Approach
Scan the grid. When a land cell has not been visited yet, count a new island and flood-fill it with an explicit stack, marking cells when they are pushed. A `Uint8Array` visited mask leaves the input grid unchanged.

## Edge cases
- No land at all gives 0.
- Diagonal neighbours do not connect.
- A long serpentine island is exactly the case that breaks recursion.

## Complexity
- Time: O(m * n), since each cell is pushed at most once.
- Space: O(m * n) for the visited mask and stack.

## Testing note
Compared with a union-find count on 500 random small grids, plus a 300x300 all-land grid and a serpentine one-island grid.

## Reusable pattern
**Iterative flood fill with a flattened index** (`r * n + c`): one number per stack entry, no recursion depth limit.
