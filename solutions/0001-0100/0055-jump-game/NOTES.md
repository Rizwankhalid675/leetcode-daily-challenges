# 55. Jump Game

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, dynamic-programming, greedy |
| Link | https://leetcode.com/problems/jump-game/ |
| Study plan | Top Interview 150 (Array / String) |

## What it asks (own words)
Starting at index 0, each value is the maximum jump length from that position. Can you reach the last index?

## Key constraints
- Up to 10⁴ positions, with jumps up to 10⁵.

## Approach
Greedy reachability: scan left to right, maintaining `farthest` = the farthest index reachable so far. If the scan
reaches an index beyond `farthest`, it's stuck. If `farthest` covers the last index, succeed early.

## Why it works
The reachable indices always form a prefix [0, farthest]: if you can reach index i, you can reach every index before
it, because you jump over them with shorter jumps. So a single number describes reachability.

## Edge cases
- A single element → true.
- A zero that can't be jumped over → false.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Compared against an explicit reachability DP on 1000 random arrays with lots of zeros.

## Reusable pattern
**Reachability collapses to a frontier when the reachable set is always a prefix.** Next: 45 counts jumps with the
same idea.
