# 28. Find the Index of the First Occurrence in a String

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | two-pointers, string, string-matching |
| Link | https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/ |
| Study plan | Top Interview 150 (Array / String) |

## What it asks (own words)
Return the index where `needle` first appears in `haystack`, or −1.

## Key constraints
- Both lengths ≤ 10⁴. Naive matching is O(n·m) in the worst case (10⁸ for inputs like "aaaa…ab"), which is borderline.

## Approach: Knuth–Morris–Pratt
1. Build `lps` (longest proper prefix that is also a suffix) for every prefix of the needle.
2. Scan the haystack once. On a match, advance both pointers. On a mismatch after j matched characters, jump j back to
   `lps[j−1]` instead of restarting, and don't move the haystack pointer.

## Why it works
When a mismatch happens after matching `needle[0..j)`, the longest prefix of the needle that could still be in
progress is the longest border of that matched part, which is `lps[j−1]`. No earlier alignment can succeed, so
nothing is skipped incorrectly, and the haystack pointer never moves back. That makes it linear.

## Edge cases
- A needle longer than the haystack → −1.
- Overlapping partial matches ("abababcab" / "ababc") exercise the fallback.

## Complexity
- Time: O(n + m)
- Space: O(m)

## JavaScript note
`haystack.indexOf(needle)` is the practical answer in production (and the test oracle here). The point of this
exercise is to learn KMP, which reappears in 214, 459, 1392 and 686.

## Reusable pattern
**Prefix function (lps / failure function):** it reuses what's already been matched instead of restarting.
