# 1339. Maximum Product of Splitted Binary Tree

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | tree, depth-first-search, binary-tree |
| Link | https://leetcode.com/problems/maximum-product-of-splitted-binary-tree/ |
| Context | Quest: 2026 Spring Sprint / Week 2: Challenge / Challenge III |

## What it asks (own words)
Remove one edge of a binary tree to split it into two parts. Maximize the product of the two parts' sums, and return that maximum modulo 10^9 + 7.

## Key constraints
- Up to 5 * 10^4 nodes with values up to 10^4, so the total is at most 5 * 10^8.
- The product can reach about 6.25 * 10^16, which is above 2^53: plain doubles would round it.
- The maximum must be found **before** taking the mod. Maximizing the reduced values would pick the wrong split.
- The tree can be a 5 * 10^4-long chain, so recursion is unsafe.

## Approach
1. Iterative preorder (a stack). Reversing that order gives a valid postorder for computing subtree sums in a Map.
2. Cutting the edge above a node with subtree sum s gives the product s * (total - s). As a function of s, this parabola peaks at total / 2. So the best cut is the s minimizing |total - 2s|, an exact integer comparison with no large products.
3. Compute `BigInt(s) * BigInt(total - s) % 1e9+7` once for the chosen s.

## Why it works
For a fixed total, s * (total - s) = (total^2 - (total - 2s)^2) / 4, so a smaller |total - 2s| means a strictly larger product. Choosing that s is equivalent to comparing exact products with BigInt, as the brute-force oracle does.

## Edge cases
- The root itself is skipped: cutting "above" it does not split the tree.
- Two nodes: the only cut gives 1 * 1 in the example.

## Complexity
- Time: O(n)
- Space: O(n)

## Testing note
Compared with a recursive brute force that maximizes exact BigInt products and only then takes the mod, on 500 random trees (small and large values) and a 3000-node tree. A 5 * 10^4 chain of 10^4s checks both the 2^53 overflow case (6.25 * 10^16) and the lack of recursion.

## Reusable pattern
**Maximize before the mod, with exact arithmetic.** When a product only matters through its maximum, compare a cheaper exact key (here |total - 2s|) and multiply once with BigInt.
