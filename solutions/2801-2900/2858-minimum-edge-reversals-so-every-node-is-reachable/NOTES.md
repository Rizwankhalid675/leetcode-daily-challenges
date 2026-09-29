# 2858. Minimum Edge Reversals So Every Node Is Reachable

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | dynamic-programming, depth-first-search, breadth-first-search, graph |
| Link | https://leetcode.com/problems/minimum-edge-reversals-so-every-node-is-reachable/ |
| Context | Quest: 2026 Spring Sprint / Week 3: Ascension / Ascension III |

## What it asks (own words)
A tree has each edge given a direction. For every node, how many edges must be flipped so that node can reach all others along directed edges?

## Key constraints
- n up to 10⁵ → answering each node with its own traversal (O(n²)) is too slow; a path-shaped tree is 10⁵ deep, so no recursion.

## Approach: rerooting
For a fixed root, every edge must point away from the root, so the answer is the number of edges that point toward it.
1. Build CSR adjacency where each directed edge u→v gives (u→v, cost 0) and (v→u, cost 1).
2. BFS from node 0, summing the cost of each tree edge walked parent→child: that is ans[0]. Record each node's BFS parent and the edge cost `down[v]`.
3. Moving the root from p to child c changes only the p–c edge: its cost goes from `down[c]` to `1 − down[c]`, so `ans[c] = ans[p] + 1 − 2·down[c]`. Process nodes in BFS order so parents are done first.

## Why it works
All other edges keep the same orientation relative to the root (still "away" or still "toward"), so only the edge being crossed changes its contribution.

## Edge cases
- Path of 10⁵ nodes (depth 10⁵) → handled by the BFS queue, no recursion.
- n = 2 → answers are 0 and 1.

## Complexity
- Time: O(n)
- Space: O(n)

## Testing note
Compared with a separate DFS per root on random relabelled trees (n ≤ 13), plus 10⁵-node path and star timing checks with known answers.

## Reusable pattern
**Rerooting DP**: compute the answer for one root, then push it across each edge with an O(1) delta.
