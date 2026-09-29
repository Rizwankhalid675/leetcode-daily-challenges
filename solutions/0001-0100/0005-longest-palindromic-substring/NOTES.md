# 5. Longest Palindromic Substring

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | two-pointers, string, dynamic-programming, manacher |
| Link | https://leetcode.com/problems/longest-palindromic-substring/ |
| Context | Quest: 2026 Spring Sprint / Week 2: Challenge / Interview Benchmark III (quiz) |

## What it asks (own words)
Return any longest contiguous substring that reads the same forwards and backwards.

## Key constraints
- Length up to 1000, of digits and English letters. O(n^2) is fine.

## Approach
Every palindrome has a centre: either a letter (odd length) or the gap between two letters (even length). Iterate over the 2n - 1 centres. For centre c, start with `l = c >> 1` and `r = l + (c & 1)`, and widen while the ends match. Track the longest span.

## Edge cases
- A single character is always a palindrome, so the answer has length >= 1.
- An all-equal string is the worst case for time, but still only O(n^2).
- When several answers tie, any one is accepted.

## Complexity
- Time: O(n^2)
- Space: O(1) besides the result.

## Testing note
Because ties may produce different valid answers, the random test checks that the result is a substring, is a palindrome, and has the brute-force maximum length (1000 random strings over a 3-symbol alphabet).

## Reusable pattern
**Expand around 2n - 1 centres** (compare 647 Palindromic Substrings). Manacher's algorithm gives O(n) if needed.
