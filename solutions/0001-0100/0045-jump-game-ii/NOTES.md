# 45. Jump Game II

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, dynamic-programming, greedy |
| Link | https://leetcode.com/problems/jump-game-ii/ |
| Study plan | Top Interview 150 (Array / String) |

## What it asks (own words)
Same jumping rules as 55, but reaching the end is guaranteed. Find the minimum number of jumps.

## Key constraints
- Up to 10⁴ positions. The DP over all jump choices is O(n · maxJump), which is fine but unnecessary.

## Approach
**Implicit BFS by layers.** The indices reachable with exactly j jumps form a contiguous block ending at `layerEnd`.
While scanning that block, track the `farthest` index reachable with one more jump. On reaching `layerEnd`, a jump is
unavoidable: increment the count and extend the layer to `farthest`. Scan only up to n − 2, because no jump is needed
from the last index.

## Why it works
BFS gives shortest paths in an unweighted graph, and here each BFS layer is an interval (as in 55), so it's represented
by its endpoint.

## Edge cases
- n = 1 → 0 jumps (the loop never runs).
- All ones → n − 1.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Compared against a shortest-path DP on 1000 random reachable arrays.

## Reusable pattern
**BFS where layers are intervals → track (layerEnd, farthest).** The same shape appears in 1326 (minimum taps) and
1024 (video stitching).
