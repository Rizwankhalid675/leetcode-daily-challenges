# 222. Count Complete Tree Nodes

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | binary-search, bit-manipulation, tree, binary-tree |
| Link | https://leetcode.com/problems/count-complete-tree-nodes/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Count the nodes of a complete binary tree (all levels full except possibly the last, which fills from the left) faster than visiting every node.

## Key constraints
- Up to 5·10⁴ nodes. A complete tree has depth O(log n), so recursion is safe.

## Approach
At a node, measure the depth along the leftmost path and along the rightmost path.
- Equal: the subtree is perfect, so it has `2^h − 1` nodes.
- Different: count `1 + count(left) + count(right)` recursively.

## Why it works
In a complete tree, at least one of the two child subtrees is perfect. That child returns after a single O(log n) depth check, so only one recursive branch goes deeper at each level: O(log n) levels × O(log n) per check.

## Complexity
- Time: O(log² n)
- Space: O(log n) recursion

## Testing note
Every complete tree size from 0 to 1100 (covering all last-level fill patterns for depths up to 11) plus the 5·10⁴ max size.

## Reusable pattern
**Exploit structural guarantees**: a perfect subtree can be counted from its height alone.
