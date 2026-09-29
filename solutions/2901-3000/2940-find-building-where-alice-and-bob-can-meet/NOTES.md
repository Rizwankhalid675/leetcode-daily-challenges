# 2940. Find Building Where Alice and Bob Can Meet

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | array, binary-search, stack, binary-indexed-tree, segment-tree, heap-priority-queue, monotonic-stack |
| Link | https://leetcode.com/problems/find-building-where-alice-and-bob-can-meet/ |
| Context | Quest: DSA / Tree-shaped Deep Forest / Segment Tree |

## What it asks (own words)
From building i you may move to any later, strictly taller building. For each pair of starting buildings, find the leftmost building both people can end up in (staying put counts), or -1.

## Key constraints
Up to 5·10^4 buildings and 5·10^4 queries, so per-query linear scans are too slow in the worst case.

## Approach
Swap so a ≤ b.
- a = b: answer b.
- heights[a] < heights[b]: Alice moves straight to b; answer b.
- Otherwise (heights[a] ≥ heights[b]) the meeting point j must be > b and taller than heights[a] (which also makes it taller than heights[b]). We need the **leftmost** such j.

Offline: bucket hard queries by b and scan i from n-1 down to 0. The stack holds the "next greater" chain of indices to the right of i: as we go left, pop every index whose height is ≤ heights[i], then push i. Before pushing i, answer the queries with b = i: along the stack, indices grow and heights grow from top to bottom, so binary-search for the topmost (nearest) entry taller than the needed height.

## Why it works
Any index removed from the stack has an index to its left that is at least as tall, so it can never be the leftmost taller building for a query to the left of both. The first index taller than a threshold therefore always survives in the stack.

## Edge cases
- Equal heights cannot move to each other (strictly taller required).
- Queries with a > b are symmetric; swapping first keeps the logic one-sided.

## Complexity
- Time: O((n + q) log n)
- Space: O(n + q)

## Testing note
Compared with a brute force that checks every building j for reachability from both sides; timing test at maximum sizes.

## Reusable pattern
**Offline queries sorted by position + monotonic stack + binary search** find "first element to the right greater than x". A max segment tree with a leftmost-descent search is the online alternative.
