# 230. Kth Smallest Element in a BST

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | tree, depth-first-search, binary-search-tree, binary-tree |
| Link | https://leetcode.com/problems/kth-smallest-element-in-a-bst/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Return the k-th smallest value (1-indexed) in a BST.

## Approach
In-order traversal visits values in increasing order. Run it iteratively and return when the counter reaches k, so only the first k values (plus the left spine) are touched.

## Complexity
- Time: O(h + k)
- Space: O(h)

## Follow-up
If the tree changes often and queries are frequent, store subtree sizes in each node. Then walk down comparing k with the left subtree size, for O(h) per query, updating sizes on insert and delete.

## Testing note
Every k on 300 random BSTs is compared with the sorted value list; two 10⁴-node chains check depth.

## Reusable pattern
**Early-exit in-order traversal** for order statistics in a BST.
