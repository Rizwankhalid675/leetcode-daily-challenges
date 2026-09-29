# 743. Network Delay Time

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | depth-first-search, breadth-first-search, graph, heap-priority-queue, shortest-path, dijkstra |
| Link | https://leetcode.com/problems/network-delay-time/ |
| Context | Quest: DSA / Graph Theory Peaks / Shortest Path |

## What it asks (own words)
A signal spreads from node k along weighted directed edges. How long until every node has received it? Return −1 if some node never does.

## Approach
Run single-source Dijkstra from k:
- The inline binary heap stores (dist, node) in two parallel arrays.
- Lazy deletion: skip a popped entry whose distance is older than dist[u].

The answer is the largest distance, or −1 if any node is still Infinity.

## Why it works
Weights are non-negative (0 is allowed), so Dijkstra's greedy settling is correct. Each node's arrival time is its shortest-path distance, and everyone has heard the signal once the farthest node has.

## Edge cases
- Zero-weight edges → the answer can be 0.
- n = 1 → 0.

## Complexity
- Time: O(E log E)
- Space: O(n + E)

## Testing note
Compared with Floyd–Warshall on random directed graphs, including 0-weight edges.

## Reusable pattern
**"Time for everything to be reached" = max over shortest-path distances.**
