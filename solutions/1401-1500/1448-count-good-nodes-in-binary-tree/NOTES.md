# 1448. Count Good Nodes in Binary Tree

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | tree, depth-first-search, breadth-first-search, binary-tree |
| Link | https://leetcode.com/problems/count-good-nodes-in-binary-tree/ |
| Study plan | LeetCode 75 (Binary Tree - DFS) |

## What it asks (own words)
A node is "good" if nothing on the path from the root down to it is larger than it. Count the good nodes.

## Key constraints
- **Up to 10⁵ nodes.** A chain-shaped tree would need 10⁵ nested calls, far beyond Node's roughly 12,500-frame default
  stack (measured locally). Recursion is unsafe at this size.

## Approach
DFS that carries the path maximum down: each stack entry is `(node, maxOnPathAbove)`. A node is good iff
`node.val >= maxOnPathAbove`, and its children inherit `max(maxOnPathAbove, node.val)`. Use an explicit stack.

## Why it works
The only information a node needs about its ancestors is their maximum, and that is passed down exactly.

## Edge cases
- The root is always good (compared against −∞).
- Equal values count as good (≥, not >).
- 10⁵-node chain: tested, no stack overflow.

## Complexity
- Time: O(n)
- Space: O(height) for the stack

## Reusable pattern
**Top-down DFS carrying path state** (max, min, sum, bitmask). It's the mirror of the bottom-up "return aggregates"
pattern (2265 in September). Choose iterative traversal whenever n can exceed about 10⁴ in JavaScript.
