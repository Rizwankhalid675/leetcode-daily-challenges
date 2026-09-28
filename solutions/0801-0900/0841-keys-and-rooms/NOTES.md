# 841. Keys and Rooms

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | depth-first-search, breadth-first-search, graph |
| Link | https://leetcode.com/problems/keys-and-rooms/ |
| Study plan | LeetCode 75 (Graphs - DFS) |

## What it asks (own words)
Only room 0 is open. Each room contains keys to other rooms. Can you eventually enter every room?

## Key constraints
- Up to 1000 rooms and 3000 keys in total.

## Approach
Treat rooms as nodes and keys as directed edges. Run DFS from room 0 with a visited array, and check that every room
was reached.

## Why it works
You can enter a room iff there's a chain of keys leading to it from room 0, i.e. it's reachable in the graph.
Collecting keys never has a downside, so reachability is exactly "can visit".

## Edge cases
- Room 0 is empty → only room 0 is reached.
- Cycles are handled by the visited array.

## Complexity
- Time: O(rooms + keys)
- Space: O(rooms)

## Reusable pattern
**Recognize a hidden graph.** "Items that unlock other items" is a directed graph, and the question is reachability.
Mark a node visited when pushing it, not when popping, so it's never pushed twice.
