# 399. Evaluate Division

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, string, depth-first-search, breadth-first-search, union-find, graph, shortest-path |
| Link | https://leetcode.com/problems/evaluate-division/ |
| Study plan | LeetCode 75 (Graphs - DFS) |

## What it asks (own words)
You're told some ratios between variables (a / b = 2, …). Answer ratio queries c / d, or −1 when they can't be
determined.

## Key constraints
- At most 20 equations and 20 queries, so a traversal per query is trivial.

## Approach
Build a weighted directed graph: `a → b` with weight v and `b → a` with weight 1/v. For a query c / d, BFS from c,
multiplying weights along the way. The product on reaching d is the answer.

## Why it works
Along a path c → x → … → d, the product telescopes: (c/x)·(x/y)·…·(z/d) = c/d. The input has no contradictions, so
every path gives the same product.

## Edge cases
- A variable not in any equation → −1, **even for x / x** (it's undefined, not 1).
- A known variable divided by itself → 1.
- Variables in different components → −1.
- Answers are floating point; the tests compare within 1e-9.

## Complexity
- Time: O(Q · (V + E))
- Space: O(V + E)

## Alternatives
Weighted union-find, which stores each node's ratio to its root. It answers queries in near-constant time and is
better when there are many queries.

## Testing note
Beyond the examples, the tests generate random consistent systems from hidden values, so every query has a known true
answer to compare against.

## Reusable pattern
**Multiplicative relations as weighted graph edges.** Paths compose relations. This also covers currency exchange and
unit conversion.
