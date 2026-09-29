# 2203. Minimum Weighted Subgraph With the Required Paths

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | graph, heap-priority-queue, shortest-path |
| Link | https://leetcode.com/problems/minimum-weighted-subgraph-with-the-required-paths/ |
| Context | Quest: DSA / Graph Theory Peaks / Shortest Path |

## What it asks (own words)
In a weighted directed graph, choose a set of edges of minimum total weight such that both src1 and src2 can reach dest using only those edges.

## Key constraints
- n and E are up to 10⁵ and weights up to 10⁵, so sums reach about 10¹⁰. That is past 2^31 but far below 2^53, so plain doubles (Float64Array) are exact.

## Approach
1. Run Dijkstra from src1 and from src2 on the graph, and from dest on the reversed graph (to get distances into dest).
2. Answer = min over every node v of d1[v] + d2[v] + dRev[v]. Return −1 if all of these are Infinity.

## Why it works
In a minimal solution, follow src1's route and src2's route to dest. Once they meet at a node v, they can share the rest of the way. So the optimal cost has the form dist(src1, v) + dist(src2, v) + dist(v, dest). Every v gives a feasible subgraph whose weight is at most that sum, and some v achieves the optimum. Minimizing over v is therefore exact.

## Edge cases
- The meeting node can be src1, src2 or dest itself.
- Parallel edges are allowed: the example has two 2→3 edges.
- If either source can't reach dest, every v gives Infinity → −1.

## Complexity
- Time: O((n + E) log E)
- Space: O(n + E)

## Testing note
Two oracles:
- an exhaustive search over every edge subset on tiny graphs, which independently confirms the "merge at v" claim;
- Floyd–Warshall with the same formula on larger random graphs with weights up to 10⁵.

A 10⁵-node cycle checks speed and totals above 2^31.

## Reusable pattern
**"Two sources into one sink" → three Dijkstras (one on the reversed graph) plus a scan for the meeting point.** The same trick works for "shortest path through a waypoint".
