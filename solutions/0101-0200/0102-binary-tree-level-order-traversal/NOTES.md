# 102. Binary Tree Level Order Traversal

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | tree, breadth-first-search, binary-tree |
| Link | https://leetcode.com/problems/binary-tree-level-order-traversal/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
List the values of a binary tree level by level, left to right within each level.

## Approach
Keep the current level as an array. For each level, record the values and gather the children (left then right) into the next level.

## Edge cases
- Empty tree returns `[]`.

## Complexity
- Time: O(n)
- Space: O(w) besides the output

## Testing note
Compared with a preorder DFS that appends each value to the list for its depth (preorder visits each depth left to right), on 1000 random trees.

## Reusable pattern
**Level-array BFS** is the base for 103, 199, 637 and other per-level questions.
