# 637. Average of Levels in Binary Tree

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | tree, depth-first-search, breadth-first-search, binary-tree |
| Link | https://leetcode.com/problems/average-of-levels-in-binary-tree/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Return the mean of the node values on each level of a binary tree, top to bottom.

## Key constraints
- Up to 10⁴ nodes with values across the full 32-bit range. A level sum is at most about 10⁴ · 2³¹ ≈ 2·10¹³, well below 2⁵³, so double arithmetic is exact for the sum.

## Approach
Standard BFS by levels: sum a level's values while collecting the next level, then divide by the level size.

## Edge cases
- A level of one node returns that value exactly.
- Mixed extreme values (−2³¹ and 2³¹ − 1) average to −0.5.

## Complexity
- Time: O(n)
- Space: O(w), the widest level

## Testing note
Compared with a recursive per-depth sum/count oracle on 1000 random trees with full-range 32-bit values, using a 1e-5 tolerance like LeetCode's checker.

## Reusable pattern
**Level-by-level BFS with a fresh array per level** makes per-level aggregates trivial.
