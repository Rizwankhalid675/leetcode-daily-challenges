# 530. Minimum Absolute Difference in BST

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | tree, depth-first-search, breadth-first-search, binary-search-tree, binary-tree |
| Link | https://leetcode.com/problems/minimum-absolute-difference-in-bst/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Find the smallest absolute difference between the values of any two different nodes in a BST.

## Key constraints
- Up to 10⁴ nodes; a chain-shaped BST would be 10⁴ deep, so the traversal is iterative.

## Approach
In-order traversal of a BST yields sorted values. In a sorted list the closest pair is always adjacent, so track the previous visited value and the minimum gap.

## Edge cases
- The closest pair can be far apart in the tree (e.g. across the root); in-order handles that naturally.

## Complexity
- Time: O(n)
- Space: O(h)

## Testing note
Compared with an all-pairs brute force on 1000 random BSTs; a 10⁴-node chain checks depth. (Same problem as 783.)

## Reusable pattern
**BST + in-order = sorted array for free**; then apply sorted-array reasoning with just a "previous" variable.
