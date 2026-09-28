# 1143. Longest Common Subsequence

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | string, dynamic-programming |
| Link | https://leetcode.com/problems/longest-common-subsequence/ |
| Study plan | LeetCode 75 (DP - Multidimensional) |

## What it asks (own words)
What's the length of the longest sequence of characters that appears, in order but not necessarily contiguously, in
both strings?

## Key constraints
- Both lengths ≤ 1000, so O(m·n) = 10⁶ is fine.

## Approach
Let `dp[i][j]` be the LCS of the first i characters of text1 and the first j of text2.
- If the last characters match: `dp[i−1][j−1] + 1`.
- Otherwise: `max(dp[i−1][j], dp[i][j−1])`, dropping the last character of one string or the other.

Keep two rows and swap them after each i.

## Why it works
If the last characters match, some LCS uses them as its final character, and pairing them is never worse. If they
differ, at least one of them isn't in the LCS, so dropping it loses nothing. Both cases are covered.

## Edge cases
- No common characters → 0.
- Identical strings → their full length.

## Complexity
- Time: O(m·n)
- Space: O(n) with rolling rows

## Testing note
Compared against brute-force enumeration of all subsequences of the shorter string (up to 2⁸), plus a 1000×1000
timing check.

## Reusable pattern
**Two-string DP grid** ("compare the last characters"). It's the foundation of edit distance (72), shortest common
supersequence, and diff tools. Compare with 115 (Distinct Subsequences) from September.
