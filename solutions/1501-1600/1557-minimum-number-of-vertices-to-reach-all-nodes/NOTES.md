# 1557. Minimum Number of Vertices to Reach All Nodes

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | graph, directed-acyclic-graph |
| Link | https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes/ |
| Context | Quest: DSA / Graph Theory Peaks / Graph |

## What it asks (own words)
Given a DAG, pick the fewest starting nodes such that every node can be reached from at least one of them.

## Approach
Return every node that has no incoming edge.

## Why it works
- **Necessary:** nothing can reach a node with in-degree 0, so it must be picked.
- **Sufficient:** from any node, keep walking backwards along incoming edges. The graph has no cycles, so this walk ends at a node with in-degree 0, and that node reaches the start.

So this set is the unique minimum.

## Complexity
- Time: O(n + E)
- Space: O(n)

## Testing note
On random DAGs (a random topological order, forward edges only), we check that the result reaches every node and that its size matches a brute-force minimum over all subsets.

## Reusable pattern
**DAG "sources" = in-degree 0.** Many DAG covering questions reduce to counting degrees, with no traversal at all.
