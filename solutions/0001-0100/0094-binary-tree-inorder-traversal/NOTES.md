# 94. Binary Tree Inorder Traversal

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | stack, tree, depth-first-search, binary-tree |
| Link | https://leetcode.com/problems/binary-tree-inorder-traversal/ |
| Context | Study plan: Top 100 Liked |

## What it asks (own words)
Return the values of a binary tree in left–node–right order.

## Approach
The recursive version is trivial; the iterative one mimics the call stack. Walk left pushing every node; when you can't go further, pop a node, record it, and continue from its right child. Stop when both the current pointer and the stack are empty.

## Edge cases
- Empty tree → `[]`.

## Complexity
- Time: O(n)
- Space: O(h) for the stack

## Testing note
Compared with a straightforward recursive traversal on random trees.

## Reusable pattern
**Explicit-stack inorder** — the same loop powers BST iterators and "k-th smallest".
