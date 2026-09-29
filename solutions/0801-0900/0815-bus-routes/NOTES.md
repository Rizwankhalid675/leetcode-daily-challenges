# 815. Bus Routes

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | array, hash-table, breadth-first-search |
| Link | https://leetcode.com/problems/bus-routes/ |
| Context | Quest: DSA / Graph Theory Peaks / BFS |

## What it asks (own words)
Buses loop over fixed sets of stops. Starting at source and not on any bus yet, what is the fewest buses you must board to reach target? Return −1 if you can't.

## Key constraints
- The routes contain at most 10⁵ stops in total. Stop IDs go up to 10⁶, so the stop → routes index is a Map.

## Approach
Run a BFS where one layer is one bus ride:
1. Map each stop to the routes that pass through it.
2. From the current frontier of stops, board every route not boarded yet. Mark it used, then scan its stops: return the ride count if target is among them, otherwise queue new stops for the next layer.

## Why it works
Each route is scanned at most once, the first time any of its stops is reached. That is the fewest rides needed to board it, and the scan is also where its stops get their shortest ride counts. Total work is bounded by the sum of route lengths.

## Edge cases
- source === target → 0, even when that stop isn't on any route.
- source or target not on any route → −1.

## Complexity
- Time: O(Σ|routes[i]|)
- Space: O(Σ|routes[i]|)

## Testing note
The oracle builds a route graph (routes are adjacent when they share a stop), runs Floyd–Warshall on it, and takes the best route-to-route distance + 1. A chain of 500 routes (10⁵ stops) checks speed.

## Reusable pattern
**Mark the group used on first touch.** When moves happen between groups ("board a whole route"), BFS layers stand for group uses, and each group is expanded only once. This avoids the O(k²) route adjacency.
