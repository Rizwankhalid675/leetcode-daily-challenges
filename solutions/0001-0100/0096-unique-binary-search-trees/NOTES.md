# 96. Unique Binary Search Trees

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | math, dynamic-programming, tree, binary-search-tree, binary-tree |
| Link | https://leetcode.com/problems/unique-binary-search-trees/ |
| Context | Study plan: Dynamic Programming |

## What it asks (own words)
Count the structurally distinct BSTs that hold exactly the keys 1..n.

## Approach
Pick the root r. Keys below r form the left subtree and keys above form the right one; each is an independent BST whose count depends only on its size. So G(k) = Σ G(r−1)·G(k−r) over r = 1..k, with G(0) = 1 (the empty tree). These are the Catalan numbers.

## Edge cases
- n = 19 gives 1,767,263,190: above 2³¹ but far below 2⁵³, so doubles are exact.

## Complexity
- Time: O(n²)
- Space: O(n)

## Testing note
Compared for n ≤ 7 with counting distinct shapes produced by inserting every permutation of 1..n into a BST; plus the known value for n = 19.

## Reusable pattern
**Root-split recurrence** for counting trees/parenthesizations: product of the independent sides, summed over the split.
