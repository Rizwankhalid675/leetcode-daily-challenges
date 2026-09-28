# 450. Delete Node in a BST

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | tree, binary-search-tree, binary-tree |
| Link | https://leetcode.com/problems/delete-node-in-a-bst/ |
| Study plan | LeetCode 75 (Binary Search Tree) |

## What it asks (own words)
Remove the node with a given key from a BST (if present) and return the root of a valid BST. Any valid result is
accepted.

## Key constraints
- Up to 10⁴ nodes, possibly unbalanced, unique values. The follow-up asks for O(height).

## Approach (iterative, three cases)
1. Find the node and its parent by BST descent.
2. **Two children:** copy the value of the in-order successor (the leftmost node of the right subtree) into the node,
   then remove the successor instead. The successor has no left child.
3. **Zero or one child** (including a relocated successor): splice the single child, or null, into the parent's
   pointer. If the removed node was the root, the child becomes the new root.

## Why it works
The successor is the smallest value greater than the node, so putting it in the node's place keeps everything on the
left smaller and everything on the right larger. Splicing a node with at most one child keeps the order, because its
subtree stays on the same side of the parent.

## Edge cases
- Key absent → the tree is unchanged.
- Deleting the root (with 0, 1 or 2 children).
- The successor is the right child itself (no left descent). Then `succParent` is the node, and the splice uses
  `parent.right`. That's why the splice checks which side of the parent holds the node.

## Complexity
- Time: O(h)
- Space: O(1)

## Testing note
Since many outputs are valid, the tests check **properties**: the result is a BST, and its in-order sequence equals
the original minus the key. This was run for every key (plus absent keys) in 300 random BSTs.

## Reusable pattern
**Reduce the hard case to an easy one**: two children → delete the successor, which has at most one child. Also,
**property-based checks** when the expected output isn't unique.
