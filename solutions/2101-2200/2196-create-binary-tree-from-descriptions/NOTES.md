# 2196. Create Binary Tree From Descriptions

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, hash-table, tree, binary-tree |
| Link | https://leetcode.com/problems/create-binary-tree-from-descriptions/ |
| Context | Quest: DSA / Tree-shaped Deep Forest / Binary Tree |

## What it asks (own words)
Each triple says "value c is the left (or right) child of value p". Build that tree and return its root.

## Approach
- Keep a map from value to node, creating nodes lazily the first time a value appears (as parent or child).
- For each triple, attach the child on the requested side and record the child value in a set.
- The root is the only parent value that never shows up as a child.

## Edge cases
- Triples arrive in arbitrary order, so a child may be seen before its parent; lazy creation handles that.
- A long chain is fine because nothing here recurses.

## Complexity
- Time: O(m) for m descriptions
- Space: O(m)

## Testing note
Random trees are generated, turned into shuffled descriptions, rebuilt, and compared by level-order serialization (LeetCode format, trailing nulls trimmed).

## Reusable pattern
**Root = the node with in-degree 0**: build from an edge list with a value-to-node map plus a "has parent" set.
