# 100. Same Tree

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | tree, depth-first-search, breadth-first-search, binary-tree |
| Link | https://leetcode.com/problems/same-tree/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Decide whether two binary trees have identical shape and identical values at every position.

## Approach
Walk both trees in lockstep with a stack of node pairs. For each pair: both null is a match; exactly one null or unequal values is a mismatch; otherwise compare the left children together and the right children together.

## Complexity
- Time: O(min(n, m))
- Space: O(h) for the stack

## Testing note
Compared with the full level-order serialization (with null markers) of both trees on 2000 random pairs; 30% of pairs are copies to exercise the "same" branch.

## Reusable pattern
**Lockstep traversal of two trees** by pushing node pairs (compare 101 Symmetric Tree, which pairs mirrored children).
