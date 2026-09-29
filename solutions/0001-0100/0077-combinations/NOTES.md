# 77. Combinations

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | backtracking |
| Link | https://leetcode.com/problems/combinations/ |
| Context | Quest: DSA / Recursion Maze / Backtracking |

## What it asks (own words)
List every way to choose k distinct numbers from 1..n, ignoring order.

## Key constraints
- 1 <= n <= 20, 1 <= k <= n. The biggest output is C(20, 10) = 184,756 lists.

## Approach
Depth-first search that only ever appends larger numbers than the last one (so each set is produced once, in sorted form). The loop's upper bound `n - need + 1` stops early when there aren't enough numbers left to finish.

## Edge cases
- k = n: exactly one combination.
- k = 1: n singletons.

## Complexity
- Time: O(k * C(n, k))
- Space: O(k) recursion depth (plus the output)

## Testing note
For every n <= 12 and every k, the result has C(n, k) entries, all unique, strictly increasing and in range; the largest case is timed.

## Reusable pattern
**Combinations: pass a start index, and prune with "enough elements remain".**
