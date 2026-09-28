# 1926. Nearest Exit from Entrance in Maze

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, breadth-first-search, matrix |
| Link | https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/ |
| Study plan | LeetCode 75 (Graphs - BFS) |

## What it asks (own words)
In a grid maze, find the fewest steps from the entrance to any open cell on the outer border, not counting the
entrance itself. Return −1 if there's no path.

## Key constraints
- Up to 100×100 cells.

## Approach
BFS level by level from the entrance. When stepping into an open border cell, return the current step count.

## Why it works
In an unweighted grid, BFS reaches cells in increasing order of distance, so the first border cell found is the
nearest one.

## Edge cases
- The entrance on the border is **not** an exit. Checking only newly reached cells handles this.
- Walled in, or a 1×1 maze → −1.

## Complexity
- Time: O(m·n)
- Space: O(m·n)

## Reusable pattern
**Grid BFS with level-by-level frontiers**, marking cells as seen when they're enqueued. Stop at the first cell that
satisfies the goal.
