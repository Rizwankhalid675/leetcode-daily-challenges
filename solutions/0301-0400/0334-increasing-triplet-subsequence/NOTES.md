# 334. Increasing Triplet Subsequence

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, greedy |
| Link | https://leetcode.com/problems/increasing-triplet-subsequence/ |
| Study plan | LeetCode 75 (Array / String) |

## What it asks (own words)
Are there three positions i < j < k with strictly increasing values?

## Key constraints
- n up to 5·10⁵. The follow-up asks for O(n) time and O(1) space.

## Approach
Two "best so far" thresholds:
- `first`: the smallest value seen;
- `second`: the smallest value that has some smaller value before it (the end of the best increasing pair).

For each x: if `x ≤ first`, lower `first`; else if `x ≤ second`, lower `second`; otherwise x beats `second` and a
triplet exists.

## Why it works
Whenever `second` holds a value, some earlier value is smaller than it, namely whatever `first` was at the moment
`second` was set. Later decreasing `first` doesn't break that, because the pair recorded in `second` still exists.
So `x > second` always completes a real triplet. Conversely, keeping the thresholds as small as possible can only help
future elements.

## Edge cases
- Equal values don't count (strict), so the `<=` comparisons matter.
- `[20, 100, 10, 12, 5, 13]`: `first` moves to 5 after `second = 12`, and the triplet 10 < 12 < 13 is still correctly
  found.

## Complexity
- Time: O(n)
- Space: O(1)

## Reusable pattern
**Patience-sorting idea / LIS with k piles.** This is the k = 3 case of "smallest possible tail for an increasing
subsequence of each length", which generalizes to O(n log n) Longest Increasing Subsequence (300).
