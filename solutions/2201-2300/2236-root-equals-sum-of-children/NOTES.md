# 2236. Root Equals Sum of Children

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | tree, binary-tree |
| Link | https://leetcode.com/problems/root-equals-sum-of-children/ |
| Context | Quest: DSA / Tree-shaped Deep Forest / Binary Tree |

## What it asks (own words)
A root with exactly two children: is the root's value the sum of the children's values?

## Approach
One comparison: `root.val === root.left.val + root.right.val`. Both children are guaranteed to exist.

## Complexity
- Time: O(1)
- Space: O(1)

## Testing note
Official examples plus hand-checked negatives and zeros.

## Reusable pattern
**Read the constraints before reaching for a traversal**: a fixed shape needs no recursion.
