# 1311. Get Watched Videos by Your Friends

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, hash-table, breadth-first-search, graph, sorting |
| Link | https://leetcode.com/problems/get-watched-videos-by-your-friends/ |
| Context | Quest: DSA / Graph Theory Peaks / BFS |

## What it asks (own words)
Find everyone exactly level hops from you (by shortest path) in an undirected friendship graph. Collect the videos they watched, count how often each appears, and return the titles sorted by count, then alphabetically.

## Approach
1. Run a BFS one layer at a time for level rounds, marking nodes as seen when they are enqueued. The final frontier holds exactly the people at distance level.
2. Count videos in a Map.
3. Sort by (count ascending, name ascending), comparing names with < and > (code-unit order, which LeetCode expects), not localeCompare.

## Edge cases
- The graph may run out before reaching level → empty result.
- Your own videos and your nearer friends' videos never count.
- Mixed case: "B" < "a" in code-unit order.

## Complexity
- Time: O(n + E + V log V), where V = distinct videos
- Space: O(n + V)

## Testing note
The oracle uses Floyd–Warshall hop distances and two stable sorts. Random video pools mix case and prefixes on purpose.

## Reusable pattern
**"Exactly distance k" → BFS by layers, marking on enqueue.** For ties, compare strings by code unit rather than with localeCompare.
