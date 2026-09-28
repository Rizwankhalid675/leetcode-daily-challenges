# 700. Search in a Binary Search Tree

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | tree, binary-search-tree, binary-tree |
| Link | https://leetcode.com/problems/search-in-a-binary-search-tree/ |
| Study plan | LeetCode 75 (Binary Search Tree) |

## What it asks (own words)
Find the node holding a given value in a BST and return the subtree rooted there, or null.

## Key constraints
- Up to 5000 nodes; the tree may be unbalanced (height up to 5000).

## Approach
From the root: equal → done; smaller → go left; larger → go right. Iterative, so an unbalanced tree can't blow the
stack.

## Why it works
The BST property (left subtree < node < right subtree) means the target can only be on one side, so each step
discards the other subtree.

## Edge cases
- Missing value → null.
- Return the node itself, not a copy: the "subtree" is just that node with its descendants.

## Complexity
- Time: O(h), where h is the height (O(log n) balanced, O(n) worst case)
- Space: O(1)

## Reusable pattern
**BST descent.** It's the core of search, insert (701), delete (450), floor/ceiling, and LCA in a BST (235).
