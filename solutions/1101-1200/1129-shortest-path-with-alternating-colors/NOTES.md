# 1129. Shortest Path with Alternating Colors

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | breadth-first-search, graph |
| Link | https://leetcode.com/problems/shortest-path-with-alternating-colors/ |
| Context | Quest: DSA / Graph Theory Peaks / BFS |

## What it asks (own words)
In a directed graph with red and blue edges (self-loops and parallel edges allowed), find the shortest path from 0 to every node that alternates colors. Use −1 if there is none.

## Approach
Run a BFS over 2n states (node, color of the last edge used):
- Node 0 starts in both states at distance 0, since the first edge may be either color.
- From a state whose last edge was red, follow only blue out-edges, and vice versa.
- The answer for v is the smaller of its two state distances, ignoring −1s.

## Why it works
Whether a path can continue depends only on the current node and the last color. So those pairs are the true graph, and a BFS on it gives shortest lengths.

## Edge cases
- Self-loops can be necessary. For example, a blue self-loop at 1 lets you reach 2 by a second red edge.
- Node 0 always gets 0.

## Complexity
- Time: O(n + R + B)
- Space: O(n + R + B)

## Testing note
The oracle grows the exact set of (node, color) states reachable in exactly L edges for L up to 2n + 2, and records the first L at which each node appears.

## Reusable pattern
**Constraint on the path → add it to the BFS state.** Here the state is (node, last color). Other problems use (node, keys held) or (node, remaining k).
