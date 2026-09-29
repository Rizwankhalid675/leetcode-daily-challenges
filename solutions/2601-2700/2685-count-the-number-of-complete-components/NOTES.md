# 2685. Count the Number of Complete Components

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | depth-first-search, breadth-first-search, union-find, graph |
| Link | https://leetcode.com/problems/count-the-number-of-complete-components/ |
| Context | Quest: DSA / Graph Theory Peaks / DFS |

## What it asks (own words)
Count the connected components in which every pair of vertices is joined directly by an edge.

## Approach
For each unvisited vertex, run an iterative DFS over its component and record:
- v, the number of vertices;
- the sum of their degrees, which equals 2E because every edge inside the component counts at both ends.

The component is complete exactly when E = v(v−1)/2, i.e. when the degree sum equals v(v−1).

## Why it works
There are no repeated edges or self-loops, so a component on v vertices has at most v(v−1)/2 edges. Reaching that maximum means every pair is present.

## Edge cases
- An isolated vertex (v = 1, no edges) counts as complete.

## Complexity
- Time: O(n + E)
- Space: O(n + E)

## Testing note
The oracle builds components with Warshall reachability and checks every pair's adjacency directly. Edge densities are random so that complete components actually show up.

## Reusable pattern
**Completeness check = count edges, don't check pairs.** On a simple graph, edges = C(v, 2) ⇔ clique.
