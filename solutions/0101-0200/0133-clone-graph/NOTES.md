# 133. Clone Graph

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | hash-table, depth-first-search, breadth-first-search, graph |
| Link | https://leetcode.com/problems/clone-graph/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Given one node of a connected undirected graph, return a deep copy: brand-new nodes with the same values and the same neighbor structure.

## Approach
BFS with a `Map<original, copy>`:
- Copy the start node and queue it.
- For each dequeued node, look at each neighbor; if it has no copy yet, create one and queue the neighbor. Then append the neighbor's copy to the current copy's neighbor list.

The map doubles as the visited set, so cycles don't loop forever and every node is copied exactly once.

## Edge cases
- Empty graph (`null`) returns `null`.
- A single node with no neighbors.

## Complexity
- Time: O(V + E)
- Space: O(V)

## Testing note
`_Node` is defined only in the test preamble (LeetCode supplies it). Random connected graphs are built, cloned, and walked back into an adjacency list; the walk also asserts that no original node object appears in the clone and that each value has one copy.

## Reusable pattern
**Old-to-new map for deep copies of graphs** (same idea as copying a list with random pointers, 138).
