# 994. Rotting Oranges

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, breadth-first-search, matrix |
| Link | https://leetcode.com/problems/rotting-oranges/ |
| Study plan | LeetCode 75 (Graphs - BFS) |

## What it asks (own words)
Each minute, rot spreads from rotten oranges to their fresh neighbours (up, down, left, right). How many minutes until
nothing fresh remains, or −1 if some fresh orange can never rot?

## Key constraints
- The grid is at most 10×10.

## Approach
**Multi-source BFS.** Put every rotten orange in the first frontier together. Each BFS level is one minute. Track the
count of fresh oranges: if it reaches 0, return the minutes; if the spread stops with fresh oranges left, return −1.

## Why it works
Starting BFS from all sources at once computes, for each orange, its distance to the nearest rotten orange. The answer
is the maximum of those distances, which is the number of levels processed.

## Edge cases
- No fresh oranges at the start → 0 (the loop never runs).
- Fresh oranges with no rotten ones at all → −1.
- Two sources spreading toward each other meet in the middle.

## Complexity
- Time: O(m·n)
- Space: O(m·n)

## Testing note
Compared against a literal minute-by-minute simulation on 500 random grids.

## Reusable pattern
**Multi-source BFS**: seed the queue with all sources. It's used for "distance to the nearest X" (542 01 Matrix, 286
Walls and Gates).
