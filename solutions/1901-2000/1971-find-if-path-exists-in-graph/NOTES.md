# 1971. Find if Path Exists in Graph

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | depth-first-search, breadth-first-search, union-find, graph |
| Link | https://leetcode.com/problems/find-if-path-exists-in-graph/ |
| Context | Quest: DSA / Graph Theory Peaks / DFS |

## What it asks (own words)
In an undirected graph, is there a path between source and destination?

## Key constraints
- Up to 2·10⁵ nodes and edges. A path-shaped graph would overflow recursive DFS, so the traversal is iterative.

## Approach
Pack the adjacency into CSR form (a prefix sum of degrees plus a flat neighbor array). Then run an explicit-stack DFS from source with a seen array, and return true as soon as destination turns up.

## Edge cases
- source === destination → true, even with no edges.
- No edges and different endpoints → false.

## Complexity
- Time: O(n + E)
- Space: O(n + E)

## Testing note
Compared with union-find connectivity on random graphs. A 2·10⁵-node path checks both depth safety and speed.

## Reusable pattern
**Iterative DFS on CSR adjacency** is the default for 10⁵-scale graphs in JS. It avoids stack overflow and allocates no per-node arrays.
