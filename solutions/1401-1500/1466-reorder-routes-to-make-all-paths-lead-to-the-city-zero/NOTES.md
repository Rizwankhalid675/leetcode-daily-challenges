# 1466. Reorder Routes to Make All Paths Lead to the City Zero

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | depth-first-search, breadth-first-search, graph |
| Link | https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/ |
| Study plan | LeetCode 75 (Graphs - DFS) |

## What it asks (own words)
n cities are connected by n−1 one-way roads forming a tree. Flip as few roads as possible so every city can drive to
city 0.

## Key constraints
- n up to 5·10⁴, so traverse iteratively.

## Approach
Store each road in both directions in the adjacency list, with a flag saying whether walking that way follows the
original direction. Traverse from city 0 (ignoring direction). Every edge walked **in its original direction** points
away from 0 and must be flipped. Sum those flags.

## Why it works
In a tree there's exactly one path from each city to 0, so every road must point toward 0, i.e. from the child to the
parent in the tree rooted at 0. When the traversal moves from parent u to child v along an original u→v road, that road
points away from 0 and must be flipped. Otherwise it already points the right way. The answer is forced, so the
minimum is just this count.

## Edge cases
- All roads already point to 0 → 0.
- A long path with every road pointing outward → n−1 (tested at n = 5·10⁴).

## Complexity
- Time: O(n)
- Space: O(n)

## Testing note
The reference computes BFS depths from 0 and counts roads whose destination is deeper than their source, a
different formulation of the same fact.

## Reusable pattern
**Store directed edges as an undirected graph with a direction flag,** traverse from the root, and add up edge costs.

## Performance note
Accepted at 252 ms / 99 MB, which is slow for O(n). The cost is allocating a small `[neighbour, flag]` array for every
edge direction (10⁵ tiny arrays). Encoding each edge as a signed integer (e.g. `+v` for "original direction", `−v−1`
for "reverse") or using flat typed-array adjacency (CSR) would remove those allocations.
