# 1161. Maximum Level Sum of a Binary Tree

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | tree, depth-first-search, breadth-first-search, binary-tree |
| Link | https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/ |
| Study plan | LeetCode 75 (Binary Tree - BFS) |

## What it asks (own words)
Sum the values on each level (the root is level 1). Return the smallest level number whose sum is the largest.

## Key constraints
- Up to 10⁴ nodes; values in ±10⁵, and negatives are allowed.

## Approach
Level-order BFS computing each level's sum. Update the best only on a **strictly** greater sum, so ties keep the
earlier (smaller) level.

## Why it works
BFS visits the levels in increasing order, so the strict comparison implements "smallest level among the maximal
sums".

## Edge cases
- All-negative sums: `bestSum` must start at −∞, not 0.
- Ties between levels → the smaller level.

## Complexity
- Time: O(n)
- Space: O(width)

## Reusable pattern
**Per-level aggregate with a tie-break by visiting order.** Initialize maxima to −∞ whenever values can be negative.
