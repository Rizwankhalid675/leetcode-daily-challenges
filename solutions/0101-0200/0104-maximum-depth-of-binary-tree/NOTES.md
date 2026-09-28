# 104. Maximum Depth of Binary Tree

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | tree, depth-first-search, breadth-first-search, binary-tree |
| Link | https://leetcode.com/problems/maximum-depth-of-binary-tree/ |
| Study plan | LeetCode 75 (Binary Tree - DFS) |

## What it asks (own words)
How many nodes are on the longest root-to-leaf path?

## Key constraints
- Up to 10⁴ nodes. A chain-shaped tree has depth 10⁴.

## Approach
Level-order traversal (BFS by levels). Each processed level adds 1 to the depth.

## Why it works
Level k of a BFS contains exactly the nodes at depth k, so the number of non-empty levels is the maximum depth.

## Recursive alternative
`depth(n) = n ? 1 + max(depth(n.left), depth(n.right)) : 0`. It's the natural definition, and the tests use it as the
reference on random trees. On LeetCode's 10⁴-node limit it works, but it sits close to Node's default stack limit
(roughly 10⁴ frames), so the iterative form is the safer habit.

## Edge cases
- Empty tree → 0. A single node → 1.
- A 10⁴-node chain (tested).

## Complexity
- Time: O(n)
- Space: O(width) for the level arrays

## Reusable pattern
**Level-by-level BFS** with a `level`/`next` array pair. The same skeleton gives level averages (637), right side
view (199), and zigzag order (103).
