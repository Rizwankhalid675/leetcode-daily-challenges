# 300. Longest Increasing Subsequence

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, binary-search, dynamic-programming, longest-increasing-subsequence |
| Link | https://leetcode.com/problems/longest-increasing-subsequence/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Length of the longest strictly increasing subsequence (elements in order, not necessarily adjacent).

## Approach
Keep `tails`, where `tails[k]` is the smallest value that can end an increasing subsequence of length `k + 1`. `tails` is always strictly increasing. For each `x`:
- Find the first tail ≥ `x` (lower bound).
- Replace it with `x` (a better, smaller ending for that length), or append if none exists (a longer subsequence).

The answer is `tails.length`.

## Why it works
Smaller tails are never worse: any extension possible from a bigger tail is also possible from a smaller one. Using lower bound (≥) rather than upper bound (>) makes equal values replace each other instead of extending, which enforces *strictly* increasing.

## Complexity
- Time: O(n log n)
- Space: O(n)

## Testing note
Compared with the classic O(n²) DP on random arrays with many duplicates.

## Reusable pattern
**Patience sorting / tails array**: the O(n log n) LIS, also used for Russian Doll Envelopes (354).
