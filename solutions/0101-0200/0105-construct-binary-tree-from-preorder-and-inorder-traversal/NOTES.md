# 105. Construct Binary Tree from Preorder and Inorder Traversal

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, hash-table, divide-and-conquer, tree, binary-tree |
| Link | https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Rebuild a binary tree with distinct values from its preorder and inorder listings.

## Key constraints
- Up to 3000 nodes; values are unique, so each value identifies one node.

## Approach
Scan preorder while a pointer `j` walks inorder. The stack holds the path of nodes that have not received a right child yet.
- If the stack top is not `inorder[j]`, the top's left subtree is still being built, so the new value is its **left** child.
- Otherwise the top's left subtree is finished. Pop while the top equals `inorder[j]` (advancing j). The last popped node is the one whose right subtree comes next, so the new value is its **right** child.
Push the new node either way.

## Why it works
Inorder lists a node right after its left subtree ends. So when the stack top equals `inorder[j]`, that node has no more left descendants coming, and popping continues up the chain of ancestors whose left subtrees have also just ended. Preorder guarantees that the next value is the first node of the next unfinished right subtree.

## Edge cases
- A left-leaning chain never pops until the end; a right-leaning chain pops at every step.

## Complexity
- Time: O(n)
- Space: O(n)

## Testing note
1000 random trees with unique values are serialized, turned into preorder/inorder, rebuilt, and compared by level-order serialization. Two 3000-node chains check depth.

## Reusable pattern
**Stack-based tree reconstruction from two traversals** avoids both recursion and the value→index map of the textbook divide-and-conquer solution.
