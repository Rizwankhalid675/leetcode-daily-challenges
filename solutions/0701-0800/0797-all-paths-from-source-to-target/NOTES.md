# 797. All Paths From Source to Target

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | backtracking, depth-first-search, breadth-first-search, graph, directed-acyclic-graph |
| Link | https://leetcode.com/problems/all-paths-from-source-to-target/ |
| Context | Quest: DSA / Recursion Maze / Assignment II (quiz) |

## What it asks (own words)
Given a directed acyclic graph as adjacency lists, list every path from node 0 to the last node.

## Key constraints
- 2 <= n <= 15, no cycles or self-loops. The output can have up to 2^13 paths, so enumeration is the only option anyway.

## Approach
DFS from node 0, keeping the current path on a stack. When the target is reached, save a copy. Push/pop around each child visit.

## Why it works
Without cycles, every walk is a simple path and DFS terminates, so no visited set is needed (one would actually wrongly block paths that share a node).

## Edge cases
- Target unreachable: empty result.
- Direct edge 0 to n - 1 gives a two-node path.

## Complexity
- Time: O(2^n * n) in the worst case (number of paths times path length)
- Space: O(n) recursion depth (plus the output)

## Testing note
Random DAGs (edges only go from smaller to larger ids) compared against a BFS over partial paths; the complete 15-node DAG checks the 2^13 worst case. Order is free, so paths are sorted before comparing.

## Reusable pattern
**All paths in a DAG: backtracking DFS with no visited set.**
