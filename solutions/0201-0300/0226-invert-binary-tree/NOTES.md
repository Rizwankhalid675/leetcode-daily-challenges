# 226. Invert Binary Tree

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | tree, depth-first-search, breadth-first-search, binary-tree |
| Link | https://leetcode.com/problems/invert-binary-tree/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Mirror a binary tree left-to-right and return its root.

## Approach
Every node's children must be swapped, and the order of visits does not matter. A BFS queue visits each node once; swap its children and enqueue them.

## Complexity
- Time: O(n)
- Space: O(n) for the queue

## Testing note
Compared with a recursive mirrored copy (serialized level order) on 1000 random trees.

## Reusable pattern
**When an operation is purely local to each node, any traversal order works**; pick the iterative one.
