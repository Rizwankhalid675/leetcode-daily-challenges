# 1334. Find the City With the Smallest Number of Neighbors at a Threshold Distance

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | dynamic-programming, graph, shortest-path, dijkstra, bellman-ford-algorithm, floyd-warshall-algorithm |
| Link | https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/ |
| Context | Quest: DSA / Graph Theory Peaks / Shortest Path |

## What it asks (own words)
For each city, count the other cities within distanceThreshold by shortest path. Return the city with the fewest such neighbors, choosing the largest index on ties.

## Key constraints
- n ≤ 100, so Floyd–Warshall's O(n³) = 10⁶ operations is the natural fit.

## Approach
1. Initialize the matrix with the undirected edges (both directions) and 0 on the diagonal.
2. Run Floyd–Warshall with k as the outermost loop. Skip a row when D[i][k] is Infinity.
3. Scan cities in ascending order and update the best when count <= bestCount. Using <= means a later (larger) city wins ties.

## Edge cases
- A city with nothing in range has count 0.
- All counts equal → return n − 1.

## Complexity
- Time: O(n³)
- Space: O(n²)

## Testing note
Compared with Bellman–Ford run from every source, with the tie-break written out explicitly, on random graphs with small thresholds so that counts often tie.

## Reusable pattern
**All-pairs on n ≤ ~400 → Floyd–Warshall** (k outermost). For "ties go to the last index", scan ascending and compare with <=.
