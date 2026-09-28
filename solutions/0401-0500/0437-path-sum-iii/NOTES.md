# 437. Path Sum III

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | tree, depth-first-search, binary-tree |
| Link | https://leetcode.com/problems/path-sum-iii/ |
| Study plan | LeetCode 75 (Binary Tree - DFS) |

## What it asks (own words)
Count the downward paths (starting at any node and ending at any descendant, or at the node itself) whose values add
up to a target.

## Key constraints
- Up to 1000 nodes; values up to ±10⁹, so path sums reach about 10¹² (exact in JS numbers).
- Negative values are allowed, so paths can't be pruned early.

## Approach
This is the tree version of "subarray sum equals k" (560). Along the current root-to-node path, keep a count map of
prefix sums. At a node with prefix S, every ancestor prefix equal to `S − target` marks the start of a path ending here
with the target sum. Add S to the map before visiting the children, and remove it afterwards (backtracking).

## Why it works
The sum of a downward path from ancestor a to node x is prefix(x) − prefix(above a). The map holds exactly the
prefixes on the current path, so no path can mix branches. Initializing with {0: 1} counts paths that start at the
root.

## Edge cases
- Zeros create multiple overlapping valid paths ([0,0,0] with target 0 gives 5).
- Forgetting the backtracking step would count prefixes from sibling branches, which is the classic bug.

## Complexity
- Time: O(n) average
- Space: O(h) for recursion plus the map

## Testing note
Compared against an O(n²) brute force that walks every downward path from every node, on 500 random trees with small
values (many zero-sum and negative cases).

## Reusable pattern
**Prefix sum + hash map of counts ("how many earlier prefixes equal current − k?"),** here applied along a DFS path
with add-on-enter / remove-on-exit.
