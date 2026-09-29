# 669. Trim a Binary Search Tree

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | tree, depth-first-search, binary-search-tree, binary-tree |
| Link | https://leetcode.com/problems/trim-a-binary-search-tree/ |
| Context | Quest: DSA / Tree-shaped Deep Forest / Assignment I (quiz) |

## What it asks (own words)
Remove every node of a BST whose value falls outside [low, high], keeping ancestor/descendant relationships among the survivors, and return the new root.

## Approach
1. **New root**: while the root is out of range, step right (value too small) or left (value too large). BST order guarantees the discarded side holds only out-of-range values.
2. **Left spine**: from the root, all values on the left side are ≤ high already, so only "< low" can occur. Whenever a left child is below low, replace it by its own right subtree (its left subtree is even smaller); repeat, then move to the left child.
3. **Right spine**: mirror image with "> high", replacing a right child by its left subtree.

Everything is loops, so a degenerate 10^4-node tree is fine.

## Why it works
Within the left subtree of an in-range node, a node below low has an entire left subtree below low too, so splicing in its right subtree removes exactly the bad nodes while keeping relative structure.

## Edge cases
- The whole tree may be trimmed: return null.
- The root itself may change.

## Complexity
- Time: O(n) worst case (each node visited at most once along the spines)
- Space: O(1)

## Testing note
Compared by level-order serialization with the classic recursive trim (run on a copy) on random BSTs.

## Reusable pattern
**BST pruning by bounds: find the new root, then fix only the two boundary spines.**
