# 98. Validate Binary Search Tree

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | tree, depth-first-search, binary-search-tree, binary-tree |
| Link | https://leetcode.com/problems/validate-binary-search-tree/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Check whether a binary tree is a valid BST: every node's left subtree holds only smaller values and its right subtree only larger values (no duplicates allowed).

## Key constraints
- Values span the full 32-bit range, so sentinel values like ±2³¹ would collide with real data; the solution starts from −Infinity instead.
- Up to 10⁴ nodes; the traversal is iterative.

## Approach
In-order traversal visits a valid BST in strictly increasing order, and only a valid BST does so. Track the previous value and fail at the first value that is not larger.

## Why it works
Checking only parent-child pairs is not enough (a node deep in the right subtree can be smaller than the root). The in-order condition compares each node with its in-order predecessor, which together cover every ancestor constraint.

## Edge cases
- Equal values anywhere fail (strict order).
- Nodes with value −2³¹ or 2³¹ − 1 are fine because the comparison starts at −Infinity.

## Complexity
- Time: O(n)
- Space: O(h)

## Testing note
Compared with the recursive (low, high) bounds definition on 2000 trees: half are random BSTs (half of those perturbed at one node), half are random shapes with small values that force many duplicates. Two 10⁴-node chains check depth.

## Reusable pattern
**Validate a BST via strictly increasing in-order**, or equivalently by passing (low, high) bounds down.
