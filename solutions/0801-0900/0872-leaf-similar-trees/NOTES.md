# 872. Leaf-Similar Trees

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | tree, depth-first-search, binary-tree |
| Link | https://leetcode.com/problems/leaf-similar-trees/ |
| Study plan | LeetCode 75 (Binary Tree - DFS) |

## What it asks (own words)
Do two binary trees have the same sequence of leaf values when read left to right?

## Key constraints
- Up to 200 nodes each.

## Approach
Collect each tree's leaves with a preorder DFS using an explicit stack. Push the right child before the left, so the
left subtree is popped (visited) first. Then compare the two arrays element by element.

## Why it works
Preorder DFS visits leaves in left-to-right order. Comparing whole arrays (lengths plus elements) avoids the pitfall
of comparing joined strings, where "2,200" versus "22,00"-style ambiguities can arise without separators.

## Edge cases
- Different shapes can still be leaf-similar.
- Different numbers of leaves → false.

## Complexity
- Time: O(n₁ + n₂)
- Space: O(n₁ + n₂)

## Alternatives
Use generators (`function*`) to stream leaves from both trees and compare lazily. That stops at the first mismatch
with only O(height) memory, which is a nice use of JS generators.

## Reusable pattern
**Iterative preorder with a stack (right pushed first).** It's the standard recursion-free tree traversal.
