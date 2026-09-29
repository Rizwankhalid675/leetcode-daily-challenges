# 97. Interleaving String

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | string, dynamic-programming |
| Link | https://leetcode.com/problems/interleaving-string/ |
| Context | Quest: DSA / Strategy Summit / 2D Dynamic Programming |

## What it asks (own words)
Can s3 be built by merging s1 and s2 while keeping each one's characters in their original order?

## Key constraints
- |s1|, |s2| ≤ 100: a 101 × 101 table is tiny. The piece-count rule (|n − m| ≤ 1) holds automatically for any order-preserving merge, so it adds no restriction.

## Approach
dp[i][j] is true when s1[0..i) and s2[0..j) can merge into s3[0..i+j). The last character s3[i+j−1] came either from s1 (needs dp[i−1][j] and s1[i−1] matches) or from s2 (needs dp[i][j−1] and s2[j−1] matches). Before reading a cell, dp[j] still holds row i−1, so one row is enough (the follow-up's O(|s2|) memory).

## Edge cases
- |s1| + |s2| ≠ |s3|: false straight away.
- Both empty: true.
- Greedy matching fails when both strings offer the same character (e.g. example 1). The DP keeps both options open.

## Complexity
- Time: O(|s1| · |s2|)
- Space: O(|s2|)

## Testing note
Compared with unmemoized recursion on random a/b strings. Half the cases are genuine random interleavings (true) and half are random strings (mostly false).

## Reusable pattern
**Two-sequence prefix DP rolled into one row**: `dp[j]` before the update is "up", `dp[j-1]` after its update is "left".
