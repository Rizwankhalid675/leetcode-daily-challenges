# 646. Maximum Length of Pair Chain

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, dynamic-programming, greedy, sorting, longest-increasing-subsequence |
| Link | https://leetcode.com/problems/maximum-length-of-pair-chain/ |
| Context | Study plan: Dynamic Programming |

## What it asks (own words)
Given intervals [l, r], chain them so each next one starts strictly after the previous one ends (b < c). Pairs can be used in any order. Find the longest chain.

## Approach
This is interval scheduling. Sort by right endpoint and sweep: take a pair whenever its left end is strictly greater than the right end of the last taken pair. (The O(n²) LIS-style DP over pairs sorted by left end also works, but the greedy is simpler and faster.)

## Why it works
Among all pairs that could start (or continue) the chain, the one finishing earliest leaves the most room for the rest; an exchange argument turns any optimal chain into the greedy one without shrinking it.

## Edge cases
- Touching pairs ([1,2] and [2,3]) cannot chain: the comparison is strict.
- Negative coordinates: `end` starts at −Infinity.

## Complexity
- Time: O(n log n)
- Space: O(n) for the sorted copy

## Testing note
Compared with checking every subset (n ≤ 10) sorted by right end for a valid strict chain.

## Reusable pattern
**Earliest-finish greedy** for "maximum number of non-overlapping intervals".
