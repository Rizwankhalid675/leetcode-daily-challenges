# 543. Diameter of Binary Tree

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | tree, depth-first-search, binary-tree, dp-on-trees |
| Link | https://leetcode.com/problems/diameter-of-binary-tree/ |
| Context | Quest: DSA / Tree-shaped Deep Forest / Assignment I (quiz) |

## What it asks (own words)
Return the number of edges on the longest path between any two nodes of a binary tree.

## Approach
Every path has a top node where it bends. At that node the path is (longest downward chain in the left subtree) + (longest in the right subtree), measured in edges, which equals the two child subtree heights counted in nodes.
- Compute heights bottom-up; at each node update `best` with `height(left) + height(right)`.
- Traversal is iterative: collect nodes root-first, then process them in reverse so both children are done before the parent.

## Edge cases
- One node: 0.
- A 10^4-node chain: no recursion, so no stack concerns.

## Complexity
- Time: O(n)
- Space: O(n)

## Testing note
Compared against BFS from every node on random small trees; plus a skewed 10^4 chain.

## Reusable pattern
**Tree diameter = max over nodes of left height + right height** (same skeleton as 687 and 124).
