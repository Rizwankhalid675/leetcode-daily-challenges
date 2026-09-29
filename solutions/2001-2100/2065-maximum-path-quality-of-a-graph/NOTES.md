# 2065. Maximum Path Quality of a Graph

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | array, backtracking, graph |
| Link | https://leetcode.com/problems/maximum-path-quality-of-a-graph/ |
| Context | Quest: DSA / Graph Theory Peaks / Graph |

## What it asks (own words)
Walk from node 0 back to node 0 within a time budget, reusing nodes and edges as often as you like. Score = the sum of the values of the distinct nodes you touched. Maximize it.

## Key constraints
- Every edge takes ≥ 10, and maxTime ≤ 100, so a walk has at most 10 edges.
- Every node has at most 4 edges, so there are at most 4^10 ≈ 10⁶ walks. That makes exhaustive search affordable.

## Approach
DFS over walks, with a visit counter per node:
- Stepping onto v adds values[v] only if cnt[v] was 0. Increment on entry, decrement on backtrack.
- Each time the walk is at node 0, record the current quality.
- Skip an edge if it would exceed maxTime.

Recursion depth is at most 10, so plain recursion is safe here.

## Edge cases
- The graph may be disconnected, or node 0 may be isolated → the answer is values[0].
- Values up to 10⁸ over at most 11 distinct nodes → far below 2^53.

## Complexity
- Time: O(4^(maxTime / minEdge)) ≈ O(4^10)
- Space: O(n + E)

## Testing note
Compared with an independent BFS over (node, visited bitmask, elapsed time) states on random graphs with ≤ 7 nodes. A 4-regular graph with all edges at 10 and maxTime 100 checks the worst-case speed.

## Reusable pattern
**Read the constraints for a hidden small depth.** When maxTime / minEdge and the max degree are both small, plain backtracking is the intended solution.
