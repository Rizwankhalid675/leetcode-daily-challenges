# 516. Longest Palindromic Subsequence

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | string, dynamic-programming |
| Link | https://leetcode.com/problems/longest-palindromic-subsequence/ |
| Context | Study plan: Dynamic Programming |

## What it asks (own words)
Find the length of the longest subsequence of a string that reads the same both ways.

## Key constraints
- Length up to 1000, so O(n²) = 10⁶ states is fine.

## Approach
Let L(i, j) be the answer for `s[i..j]`. If the end characters match, both can wrap an inner palindrome: L(i+1, j-1) + 2. Otherwise one of them is unused: max(L(i+1, j), L(i, j-1)). Fill i from right to left and j from i upward. Row i only needs row i+1, so a single 1D array plus a saved "diagonal" value (L(i+1, j-1)) is enough.

## Edge cases
- Single character: 1.
- i = j-1 with equal characters: the diagonal is the empty range, value 0, giving 2.

## Complexity
- Time: O(n²)
- Space: O(n)

## Testing note
Compared with enumerating all 2ⁿ subsequences for strings up to length 12 over small alphabets; plus a 1000-length timing check.

## Reusable pattern
**Interval DP on a string collapsed to one row** by iterating the left end downward and carrying the diagonal in a scalar. (Equivalent to LCS of s and its reverse.)
