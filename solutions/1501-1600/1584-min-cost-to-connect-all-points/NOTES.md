# 1584. Min Cost to Connect All Points

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, union-find, graph, minimum-spanning-tree, prims-algorithm, kruskals-algorithm, boruvkas-algorithm |
| Link | https://leetcode.com/problems/min-cost-to-connect-all-points/ |
| Context | Quest: DSA / Tree-shaped Deep Forest / Minimum Spanning Tree |

## What it asks (own words)
Connect all points with straight "wires" whose cost is the Manhattan distance, minimizing the total. That is the weight of a minimum spanning tree of the complete graph.

## Key constraints
Up to 1000 points, so the complete graph has about 500,000 edges.

## Approach
Prim's algorithm in its O(n²) array form, which suits dense graphs:
- `dist[v]` is the cheapest known connection from v to the tree (start with point 0 at distance 0).
- Repeat n times: pick the unconnected point with the smallest `dist`, add it and its cost, then relax every other unconnected point's `dist` with its distance to the new point.

No edge list and no heap are needed.

## Edge cases
- One point costs 0.
- Totals stay below about 4·10^9, far under 2^53.

## Complexity
- Time: O(n²)
- Space: O(n)

## Testing note
Compared with Kruskal over all pair edges on random small point sets, and at n = 1000 (the timing test also runs the Kruskal oracle).

## Reusable pattern
**Dense graph MST: array-based Prim, O(V²)**, beats sorting V² edges.
