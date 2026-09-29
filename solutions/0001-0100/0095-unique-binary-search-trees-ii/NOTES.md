# 95. Unique Binary Search Trees II

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | dynamic-programming, backtracking, tree, binary-search-tree, binary-tree |
| Link | https://leetcode.com/problems/unique-binary-search-trees-ii/ |
| Context | Study plan: Dynamic Programming |

## What it asks (own words)
List every structurally distinct BST containing exactly the keys 1..n (n ≤ 8).

## Approach
Recursive on a key range [lo, hi]: for each root r, combine every tree from [lo, r−1] as the left child with every tree from [r+1, hi] as the right child. An empty range yields the single "tree" `null`. Memoize by range so each range's list is built once; the same subtree objects are then shared by several parents.

## Why it works
Choosing the root fixes which keys go left and right (BST order), and the two sides are independent, so the product over sides, summed over roots, enumerates each tree exactly once.

## Edge cases
- Shared subtrees: fine for LeetCode, which only reads (serializes) the trees. If a caller mutated the output, each tree would need to be deep-copied instead.
- n = 1: a single node.

## Complexity
- Time: O(Catalan(n)) new root nodes (the output size, about 4ⁿ / n^1.5) — 1430 trees for n = 8.
- Space: the same order, thanks to sharing.

## Testing note
Serialized each tree to LeetCode's level-order form and compared the resulting **set** with the set produced by inserting every permutation of 1..n into a BST (n ≤ 7). For n = 8, checked the count (1430), uniqueness, and that each in-order traversal is 1..8.

## Reusable pattern
**Generate structures by memoized splitting on the root**; sharing immutable substructures keeps it fast.
