# 427. Construct Quad Tree

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, divide-and-conquer, tree, matrix |
| Link | https://leetcode.com/problems/construct-quad-tree/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Compress an n×n 0/1 grid (n a power of two) into a quad tree: a region that is all one value is a leaf; otherwise it splits into four equal quadrants.

## Approach
Build bottom-up by recursion on `(row, col, size)`:
- A 1×1 region is a leaf with `val = (cell === 1)`.
- Otherwise build the four quadrants. If all four are leaves with the same value, the whole region is uniform, so return one merged leaf. Otherwise return an internal node holding the four children.

Leaves get explicit `null` children, and `val` is a boolean, matching LeetCode's node definition. Internal nodes' `val` may be either value; this uses `true`.

## Key constraints
- n ≤ 64, so the recursion depth is at most 7.

## Complexity
- Time: O(n²), since each cell is visited once and each merge check is O(1)
- Space: O(log n) recursion (plus the tree)

## Testing note
`_Node` is defined only in the test preamble. The official outputs are compared using a serializer that follows LeetCode's level-order format. Random block-structured grids (so merges actually happen) are rebuilt by painting the tree back into a grid; the painter also asserts the tree is minimal (no internal node with four equal leaves).

## Reusable pattern
**Bottom-up merge in divide and conquer**: solve the quadrants first, then collapse when the children agree, which avoids rescanning each region.
