# 463. Island Perimeter

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, depth-first-search, breadth-first-search, matrix |
| Link | https://leetcode.com/problems/island-perimeter/ |
| Context | Quest: DSA / Graph Theory Peaks / DFS |

## What it asks (own words)
A grid holds one 4-connected island with no lakes. Return the length of its coastline.

## Approach
Each land cell has 4 sides. Every side two land cells share hides one side of each, so subtract 2 per adjacent pair. Look only right and down so each pair is counted once:

perimeter = 4 · land − 2 · sharedSides

## Why it works
A cell's side counts toward the perimeter exactly when the neighbor across it is water or off-grid. The formula counts all sides, then removes the land–land ones.

## Complexity
- Time: O(m·n)
- Space: O(1)

## Testing note
The oracle checks all 4 neighbors of every land cell. The formula doesn't depend on the "exactly one island" guarantee, so random grids (even with several islands) are valid tests.

## Reusable pattern
**Perimeter / boundary counting = local counting.** You don't need a DFS; just count each land cell's exposed sides.
