# 392. Is Subsequence

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | two-pointers, string, dynamic-programming |
| Link | https://leetcode.com/problems/is-subsequence/ |
| Study plan | LeetCode 75 (Two Pointers) |

## What it asks (own words)
Can you delete characters from t (keeping order) to obtain s?

## Key constraints
- |s| ≤ 100, |t| ≤ 10⁴. The follow-up asks about billions of different s against the same t.

## Approach
Scan t with pointer j and advance pointer i in s on every match. s is a subsequence iff i reaches |s|.

## Why it works
Greedy earliest matching: if s can be matched at all, matching s[i] at its earliest occurrence after the previous
match leaves the most of t for the remaining characters (exchange argument).

## Edge cases
- Empty s → true (even for empty t).
- Repeated characters need distinct positions in t: "aaa" vs "aa" → false.

## Complexity
- Time: O(|t|)
- Space: O(1)

## Follow-up (many queries of s)
Preprocess t into, for each letter, the sorted list of its positions. Each character of s then binary searches for the
first position after the previous match: O(|s| log |t|) per query instead of O(|t|).

## Reusable pattern
**Greedy two-pointer subsequence matching.** It's the building block for 1143 (LCS) intuition and for "next
occurrence" tables.
