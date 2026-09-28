# 547. Number of Provinces

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | depth-first-search, breadth-first-search, union-find, graph |
| Link | https://leetcode.com/problems/number-of-provinces/ |
| Study plan | LeetCode 75 (Graphs - DFS) |

## What it asks (own words)
Given an adjacency matrix of cities, count the groups of cities that are connected directly or indirectly (the
connected components).

## Key constraints
- n ≤ 200 → an O(n²) scan of the matrix is fine.

## Approach: Union-Find
Start with every city in its own set (n provinces). For every direct connection (i, j), union their sets. Each union
that merges two *different* sets reduces the count by one.

DSU details:
- `find` with **path halving** (each node points to its grandparent as we walk up), which keeps trees shallow;
- **union by size**: attach the smaller tree under the larger one.

Together these make operations effectively O(α(n)), which is nearly constant.

## Why it works
Components can only merge, never split. Starting from n singletons, the number of successful merges is exactly
n − (number of components).

## Edge cases
- No connections → n provinces. Everything connected → 1.
- Only the upper triangle is scanned, since the matrix is symmetric.

## Complexity
- Time: O(n² · α(n))
- Space: O(n)

## Alternatives
DFS/BFS from each unvisited city, counting how many times a new traversal starts. It's equally good here, and the
tests use it as the reference. DSU shines when edges arrive one at a time ("online" connectivity).

## Reusable pattern
**Union-Find template** (find with path compression plus union by size or rank). It's reused in 684, 721, 990, 1061,
Kruskal's MST, etc.
