# 1489. Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | union-find, graph, sorting, minimum-spanning-tree, strongly-connected-component, prims-algorithm, kruskals-algorithm, boruvkas-algorithm |
| Link | https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/ |
| Context | Quest: DSA / Tree-shaped Deep Forest / Minimum Spanning Tree |

## What it asks (own words)
In a connected weighted graph, classify edges: **critical** ones are in every minimum spanning tree; **pseudo-critical** ones are in some but not all. Return both index lists.

## Key constraints
At most 100 vertices and 200 edges, so re-running Kruskal once or twice per edge is cheap.

## Approach
1. Sort edge indices by weight and run Kruskal with union-find to get the MST weight W.
2. For each edge e:
   - Run Kruskal without e. If the result is heavier than W, or the graph no longer spans, e is critical.
   - Otherwise run Kruskal with e forced in first. If the weight is still W, e appears in some MST: pseudo-critical.
   - Else e is in no MST.

## Why it works
If deleting e still allows weight W, some MST avoids e (not critical). If some spanning tree containing e has weight W, that tree is an MST that uses e.

## Edge cases
- Bridges: removing them disconnects the graph; the helper returns Infinity, so they count as critical.
- Equal weights create many MSTs; the forced run handles ties correctly.

## Complexity
- Time: O(m² · α(n)) plus the O(m log m) sort
- Space: O(n + m)

## Testing note
Compared against a brute force that enumerates every (n−1)-edge subset of small random graphs, finds all MSTs, and classifies edges by how many MSTs include them.

## Reusable pattern
**Classify edges by re-running Kruskal with the edge excluded or forced in.**
