# 124. Binary Tree Maximum Path Sum

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | dynamic-programming, tree, depth-first-search, binary-tree, dp-on-trees |
| Link | https://leetcode.com/problems/binary-tree-maximum-path-sum/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
A path is any chain of nodes connected by edges, used at most once each, not necessarily through the root. Find the largest sum of values along any non-empty path.

## Key constraints
- Up to 3·10⁴ nodes, so a chain-shaped tree is too deep for comfortable recursion; the solution is iterative.
- Values can be negative, and the path must contain at least one node.

## Approach
For each node, its **gain** is the best sum of a path that starts at the node and goes down: `val + max(0, gain(left), gain(right))` (a negative child branch is simply not taken).
The best path whose highest node is this node is `val + max(0, gain(left)) + max(0, gain(right))`. Take the maximum of this over all nodes.
Children must be processed before parents: reversing an iterative preorder (node, then children) gives such an order. Gains are kept in a Map.

## Why it works
Every path has a unique highest node; from there it goes down at most one way into each subtree. The best such downward extensions are exactly the clipped gains.

## Edge cases
- All values negative: the answer is the largest single value, since the path must be non-empty (best starts at −∞, not 0).

## Complexity
- Time: O(n)
- Space: O(n)

## Testing note
Compared with an all-pairs brute force (sum along the path between every pair of nodes through their lowest common ancestor) on 500 random trees; a 3·10⁴ chain with alternating values checks depth and the expected sum.

## Reusable pattern
**"Return one arm, record both arms"**: the value passed up is a one-sided path; the answer considers the two-sided path at each node (compare 543 Diameter).
