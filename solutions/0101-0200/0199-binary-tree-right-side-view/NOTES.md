# 199. Binary Tree Right Side View

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | tree, depth-first-search, breadth-first-search, binary-tree |
| Link | https://leetcode.com/problems/binary-tree-right-side-view/ |
| Study plan | LeetCode 75 (Binary Tree - BFS) |

## What it asks (own words)
Looking at the tree from the right, which node do you see on each level, from top to bottom?

## Key constraints
- Up to 100 nodes.

## Approach
Level-order BFS; record the last node of each level.

## Why it works
From the right you see the rightmost node at every depth. That's the last node of the level in left-to-right BFS
order, even when it sits in the *left* subtree because the right subtree is shallower (example 2).

## Edge cases
- Empty tree → [].
- A deep left branch under a shallow right branch: its lower levels are visible.

## Complexity
- Time: O(n)
- Space: O(width)

## Alternatives
DFS visiting right before left, recording the first node seen at each new depth. It uses the same idea but in depth
order.

## Reusable pattern
**Per-level BFS summary** (last/first node, sum, max). Compare 104, 1161 and 637.
