# 1372. Longest ZigZag Path in a Binary Tree

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | dynamic-programming, tree, depth-first-search, binary-tree |
| Link | https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree/ |
| Study plan | LeetCode 75 (Binary Tree - DFS) |

## What it asks (own words)
A zigzag path goes down the tree alternating left and right steps. It can start anywhere, in either direction. Return
the longest one, measured in edges.

## Key constraints
- Up to 5·10⁴ nodes, so recursion depth could exceed the JS stack on a chain. Use iteration.

## Approach
DFS where each stack entry carries the direction of the step that reached the node, and the length of the zigzag
ending with that step.
- Moving to the **opposite** side of how we arrived extends the zigzag: `len + 1`.
- Moving to the **same** side starts a new zigzag from the parent: length 1.

Track the maximum length seen.

## Why it works
Any zigzag ending at node x is determined by its last step's direction. The best one ending there is either the parent's
best zigzag of the opposite direction plus one, or just the single step. This is a small DP on the path, computed
top-down.

## Edge cases
- A single node → 0.
- A straight chain → 1 (every step is the same direction, so the length resets to 1).

## Complexity
- Time: O(n)
- Space: O(h) stack

## Testing note
The brute force starts at every node in both directions and follows the zigzag to the end. It was compared on 500
random trees, plus a 5·10⁴-node chain for the stack-depth check.

## Reusable pattern
**Top-down DFS with a small state (direction, running length)**, i.e. tree DP where the state flows from parent to
child.
