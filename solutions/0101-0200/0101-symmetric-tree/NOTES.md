# 101. Symmetric Tree

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | tree, depth-first-search, breadth-first-search, binary-tree |
| Link | https://leetcode.com/problems/symmetric-tree/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Is a binary tree a mirror image of itself around its center?

## Approach
The tree is symmetric exactly when the left subtree mirrors the right subtree. Compare pairs of nodes with a stack: both null matches; one null or different values fails; otherwise the outer pair (a.left, b.right) and the inner pair (a.right, b.left) must also match.

## Complexity
- Time: O(n)
- Space: O(n) for the stack

## Testing note
Compared with "the serialized tree equals its serialized mirror" on 2000 random trees, 40% of them built symmetric on purpose (some then perturbed by one value).

## Reusable pattern
Same lockstep pair traversal as 100 Same Tree, only with **crossed children**.
