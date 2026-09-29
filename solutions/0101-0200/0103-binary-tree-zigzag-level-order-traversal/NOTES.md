# 103. Binary Tree Zigzag Level Order Traversal

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | tree, breadth-first-search, binary-tree |
| Link | https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Level-order traversal where the reading direction alternates: first level left to right, next right to left, and so on.

## Approach
Do the normal left-to-right level BFS (so the next level is always collected in natural order), and reverse the recorded values on every second level.

## Why it works
The direction only affects how a level is reported, not which nodes are on the next level, so the traversal itself never needs to change direction.

## Complexity
- Time: O(n)
- Space: O(w) besides the output

## Testing note
Compared with a depth-bucketed DFS whose odd rows are reversed, on 1000 random trees, plus a full 4-level tree.

## Reusable pattern
**Separate traversal order from output order**: traverse the simple way, then transform each row.
