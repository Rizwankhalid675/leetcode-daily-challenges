# 173. Binary Search Tree Iterator

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | stack, tree, design, binary-search-tree, binary-tree, iterator |
| Link | https://leetcode.com/problems/binary-search-tree-iterator/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Build an iterator over a BST that returns its values in increasing order, with `next()` and `hasNext()`.

## Key constraints
- Up to 10⁵ nodes and 10⁵ calls. The follow-up asks for amortized O(1) per call and O(h) memory.

## Approach
Run an in-order traversal one step at a time. The stack holds the nodes whose left side is finished but which have not been returned yet.
- Constructor: push the left spine from the root.
- `next()`: pop the top (the smallest remaining value), then push the left spine of its right subtree.
- `hasNext()`: the stack is not empty.

## Why it works
This is exactly the iterative in-order loop, paused between outputs. Each node is pushed and popped once, so n calls to next cost O(n) in total.

## Edge cases
- A 10⁵-deep chain: the stack handles it; there is no recursion.

## Complexity
- Time: amortized O(1) for next, O(1) for hasNext
- Space: O(h)

## Testing note
On 500 random BSTs the iterator's output (with extra hasNext calls mixed in) is compared with the sorted values; two 10⁵-node chains cover the extreme shapes.

## Reusable pattern
**Turn a recursive traversal into a resumable one by keeping its explicit stack between calls.**
