# 2508. Add Edges to Make Degrees of All Nodes Even

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | hash-table, graph |
| Link | https://leetcode.com/problems/add-edges-to-make-degrees-of-all-nodes-even/ |
| Context | Quest: DSA / Graph Theory Peaks / Graph |

## What it asks (own words)
Can you add at most two new edges (no duplicates, no self-loops) so that every node ends up with even degree?

## Approach
Each new edge flips the parity of exactly two nodes, so only the list of odd-degree nodes matters:
- **0 odd:** already done.
- **2 odd (a, b):** add a–b if that edge doesn't exist. Otherwise find any third node c that is adjacent to neither a nor b, and add a–c and b–c (c gets +2, so it stays even).
- **4 odd:** two edges must pair them up. Try the three perfect matchings and check that both edges are free.
- **1, 3, or more than 4:** impossible. The odd count is always even, and two edges can fix at most 4 nodes.

## Edge cases
- Two odd nodes already adjacent and every other node touches one of them → false.
- Adjacency uses Sets, so "is this edge free?" is O(1).

## Complexity
- Time: O(n + E)
- Space: O(n + E)

## Testing note
Compared with a brute force that tries every combination of 0, 1, or 2 missing edges on random small graphs. A 10⁵-node path checks speed.

## Reusable pattern
**Parity problems: only the odd set matters.** Each added edge toggles two endpoints, so do the case analysis on the size of that set.
