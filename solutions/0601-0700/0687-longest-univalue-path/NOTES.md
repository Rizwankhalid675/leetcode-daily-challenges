# 687. Longest Univalue Path

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | tree, depth-first-search, binary-tree, dp-on-trees |
| Link | https://leetcode.com/problems/longest-univalue-path/ |
| Context | Quest: DSA / Tree-shaped Deep Forest / Binary Tree |

## What it asks (own words)
Find the longest path (counted in edges) whose nodes all share one value. It may bend at any node.

## Approach
Post-order DP. For every node compute `arm` = the longest downward chain of equal values starting at it:
- a child contributes `arm(child) + 1` only if its value equals the node's value, otherwise 0;
- `arm(node) = max(left, right)`;
- a path bending at this node has length `left + right`; keep the maximum.

The traversal is iterative (root-first order, processed in reverse, so children are finished before parents), which avoids deep recursion.

## Why it works
Every path has one highest node; at that node it is made of at most one downward arm on each side, and each arm must stay within equal values.

## Edge cases
- Empty tree gives 0.
- Equal values that are not parent-child connected must not be joined; the check is against the direct child only.

## Complexity
- Time: O(n)
- Space: O(n)

## Testing note
Compared against a brute force that builds the tree as an undirected graph and runs BFS from every node through equal-valued neighbours.

## Reusable pattern
**"Longest path in a tree" = best of left arm + right arm at each apex** (same shape as 543 and 124).
