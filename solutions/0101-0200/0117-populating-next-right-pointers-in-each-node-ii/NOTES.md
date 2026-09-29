# 117. Populating Next Right Pointers in Each Node II

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | linked-list, tree, depth-first-search, breadth-first-search, binary-tree |
| Link | https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
In an arbitrary binary tree, point each node's `next` at the node immediately to its right on the same level, or null if it is the last one.

## Key constraints
- Up to 6000 nodes. The follow-up asks for constant extra space (no queue).

## Approach
Handle the tree one level at a time. The current level is already linked through `next`, so walk it like a linked list. While walking, append every child (left, then right) to a new chain behind a dummy node with a `tail` pointer. That chain is exactly the next level, linked in order. Move to `dummy.next` and repeat.

The dummy is a plain object `{ next: null }`, so the solution never has to construct a `_Node`.

## Why it works
Children of the nodes on one level, taken left to right, are the next level left to right. Gaps (missing children) do not matter because the tail only advances on children that exist.

## Edge cases
- Empty tree: the loop never runs, return null.
- Levels whose nodes have no children in the middle: handled by the tail pointer.

## Complexity
- Time: O(n)
- Space: O(1) extra

## Testing note
Checks LeetCode's "#"-separated output on the example and hand-built trees with gaps. On 1000 random trees, a BFS oracle checks that each node's next is the following node of its level. A 6000-node zig-zag chain checks depth handling.

## Reusable pattern
**Use the level you just linked as the queue for the next level** (the same idea solves 116 for perfect trees).
