# 108. Convert Sorted Array to Binary Search Tree

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, divide-and-conquer, tree, binary-search-tree, binary-tree |
| Link | https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Turn a strictly increasing array into a height-balanced binary search tree.

## Approach
Pick the middle element as the root. Everything left of it is smaller (left subtree), everything right is larger (right subtree). Recurse on both halves.

## Why it works
Splitting at the middle leaves halves whose sizes differ by at most 1, and this holds at every level, so the heights of sibling subtrees differ by at most 1. The recursion depth is only about log₂(10⁴) ≈ 14.

## Edge cases
- Even length: either middle works; this uses the lower one, so the tree shape can differ from the example output (LeetCode accepts any valid answer).

## Complexity
- Time: O(n)
- Space: O(log n) recursion

## Testing note
Since several trees are valid, the tests check the properties: in-order traversal equals the input (a BST containing exactly those values) and every node is height-balanced.

## Reusable pattern
**Middle as root** for building balanced trees from sorted data.
