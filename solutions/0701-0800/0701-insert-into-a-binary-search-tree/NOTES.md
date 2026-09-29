# 701. Insert into a Binary Search Tree

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | tree, binary-search-tree, binary-tree |
| Link | https://leetcode.com/problems/insert-into-a-binary-search-tree/ |
| Context | Quest: DSA / Tree-shaped Deep Forest / Binary Search Tree |

## What it asks (own words)
Add a new value (not already present) to a binary search tree and return the root. Any valid BST result is accepted.

## Approach
Follow the search path: go left if the value is smaller than the current node, right otherwise. The first missing child on that path is where the new leaf goes. The loop is iterative, so a degenerate (list-shaped) tree of 10^4 nodes costs no stack.

## Edge cases
- Empty tree: the new node becomes the root.

## Complexity
- Time: O(h), where h is the tree height (O(n) worst case)
- Space: O(1)

## Testing note
Official examples compared by level-order serialization (leaf insertion reproduces the expected outputs exactly). Random BSTs checked for a sorted in-order traversal containing every value.

## Reusable pattern
**BST insert = unsuccessful search + attach leaf.**
