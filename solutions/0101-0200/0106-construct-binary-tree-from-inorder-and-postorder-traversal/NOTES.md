# 106. Construct Binary Tree from Inorder and Postorder Traversal

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, hash-table, divide-and-conquer, tree, binary-tree |
| Link | https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/ |
| Context | Quest: DSA / Sorting Plateau / Divide and Conquer |

## What it asks (own words)
Rebuild a binary tree (unique values) from its inorder and postorder listings.

## Key constraints
- Up to 3000 nodes, possibly a single chain → an iterative build avoids any recursion-depth worries.

## Approach
Reading postorder from the end visits root, then the right subtree, then the left: a "reverse preorder" that goes right first. Reading inorder from the end gives right, root, left. Keep a stack of the current rightmost path:
- If the stack top isn't the current inorder element (from the right), its right subtree isn't finished yet, so the new value is its **right** child.
- If it is, pop while the top matches the inorder pointer (these nodes' right subtrees are complete). The new value is the **left** child of the last popped node.
Push the new node either way.

## Why it works
The inorder pointer (right to left) marks the next node whose right side is complete. Popping to it finds exactly the ancestor whose left subtree starts next in reverse postorder.

## Edge cases
- Single node.
- Fully left- or right-skewed chains of 3000 nodes.

## Complexity
- Time: O(n): each node is pushed and popped once
- Space: O(n) for the stack

## Testing note
Random trees are flattened to inorder/postorder and rebuilt; the level-order shapes must match. Skewed 3000-node chains check the traversals round-trip.

## Reusable pattern
**Stack-based tree reconstruction from traversals** (the mirror of 105's iterative preorder + inorder build). A recursive version with an inorder index map is the other O(n) option.
