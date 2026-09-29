# 1765. Map of Highest Peak

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, breadth-first-search, matrix |
| Link | https://leetcode.com/problems/map-of-highest-peak/ |
| Context | Quest: DSA / Graph Theory Peaks / BFS |

## What it asks (own words)
Give every cell a height. Water must be 0, neighboring cells may differ by at most 1, and no height may be negative. Make the tallest cell as tall as possible.

## Key constraints
- Up to 1000×1000 = 10⁶ cells, so use a flat Int32Array for heights and the queue instead of arrays of pairs.

## Approach
Run a multi-source BFS seeded with every water cell at height 0. Each land cell gets 1 + the height of the cell that first reached it, which is its grid distance to the nearest water.

## Why it works
- **Upper bound:** a cell can't be taller than its distance to the nearest water, since height rises by at most 1 per step from a 0.
- **Achievable:** the BFS distances meet that bound everywhere, and neighbors' distances differ by at most 1.

So every cell reaches its individual maximum at the same time.

## Edge cases
- An all-water grid → all zeros.
- The result is converted back to plain arrays, since LeetCode compares against number[][].

## Complexity
- Time: O(m·n)
- Space: O(m·n)

## Testing note
With no obstacles, BFS distance equals Manhattan distance to the nearest water, so the oracle takes the minimum Manhattan distance over all water cells. A validity checker confirms the rules. A 10⁶-cell grid with one water cell checks speed.

## Reusable pattern
**Multi-source BFS = distance to the nearest of many sources**, done in one pass by seeding the queue with all of them (same as 542, 01 Matrix).
