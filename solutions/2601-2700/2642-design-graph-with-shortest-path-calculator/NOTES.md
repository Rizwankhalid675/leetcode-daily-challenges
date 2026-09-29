# 2642. Design Graph With Shortest Path Calculator

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | graph, design, heap-priority-queue, shortest-path |
| Link | https://leetcode.com/problems/design-graph-with-shortest-path-calculator/ |
| Context | Quest: DSA / Graph Theory Peaks / Shortest Path |

## What it asks (own words)
Build a directed weighted graph that supports adding an edge and asking for the shortest path between two nodes.

## Key constraints
- n ≤ 100, with at most 100 addEdge calls and 100 queries. Running Dijkstra per query costs about 100 · n² log n in the worst case, which is trivial.

## Approach
- Adjacency lists hold (to, weight) pairs in flat arrays. addEdge just appends.
- shortestPath runs Dijkstra with an inline binary heap and returns as soon as node2 is popped with a current distance. It returns −1 if the heap empties first.

## Why it works
Weights are positive, so the first time node2 leaves the heap with its current distance, that distance is final.

## Edge cases
- node1 === node2 → 0.
- Paths reach about 99 · 10⁶ ≈ 10⁸, which is safe.

## Complexity
- Time: O(E log E) per query, O(1) per addEdge
- Space: O(n + E)

## Testing note
Random sequences of adds and queries are checked against a fresh Floyd–Warshall over all edges added so far.

## Reusable pattern
**Few queries + dynamic edges → recompute per query.** With 100 queries on tiny graphs, incremental Floyd (an O(n²) update per added edge) is an alternative, but per-query Dijkstra is simpler.
