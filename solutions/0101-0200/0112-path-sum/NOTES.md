# 112. Path Sum

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | tree, depth-first-search, breadth-first-search, binary-tree |
| Link | https://leetcode.com/problems/path-sum/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Is there a path from the root down to a leaf whose values add up to the target?

## Key constraints
- Up to 5000 nodes, so a degenerate tree is 5000 deep; the solution is iterative.
- Values and target may be negative, so no pruning on partial sums is possible.

## Approach
DFS with two parallel stacks: nodes and the sum still needed on arrival. Subtract the node's value; at a leaf, succeed if nothing remains.

## Edge cases
- Empty tree: false, even for target 0.
- A node with one child is not a leaf, so a path cannot stop there.

## Complexity
- Time: O(n)
- Space: O(h) for the stacks (O(n) worst case)

## Testing note
Compared with a recursive list of all root-to-leaf sums on 1000 random trees with negative values; a 5000-node chain checks depth.

## Reusable pattern
**Carry the remaining target down the tree** instead of the running sum; the leaf test becomes "is it zero".
