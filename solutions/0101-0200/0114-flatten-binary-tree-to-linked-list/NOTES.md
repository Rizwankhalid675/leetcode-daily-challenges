# 114. Flatten Binary Tree to Linked List

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | linked-list, stack, tree, depth-first-search, binary-tree |
| Link | https://leetcode.com/problems/flatten-binary-tree-to-linked-list/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Rewire a binary tree in place into a right-only chain that visits the nodes in preorder; every left pointer becomes null.

## Approach
Walk down the right pointers from the root. At a node with a left subtree:
1. Find the rightmost node of that left subtree (the last node the left subtree visits in preorder).
2. Attach the node's current right subtree there.
3. Move the left subtree to the right and clear the left pointer.
Then continue to `cur.right`.

## Why it works
In preorder, a node's right subtree comes right after the last node of its left subtree, which is the rightmost node of the left subtree. Splicing it there keeps the preorder unchanged while removing one left edge. Repeating down the chain removes every left edge.

## Complexity
- Time: O(n). Each rightmost-path search walks edges that are then moved into the main chain and are not searched again.
- Space: O(1)

## Testing note
On 1000 random trees, the result is compared **by node identity** with an iterative preorder taken before flattening, and every left pointer must be null. A 2000-node left chain checks the worst depth.

## Reusable pattern
**Morris-style splicing through the in-order/preorder predecessor** gives O(1)-space tree rewiring.
