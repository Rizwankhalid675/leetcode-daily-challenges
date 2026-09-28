# 242. Valid Anagram

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | hash-table, string, sorting |
| Link | https://leetcode.com/problems/valid-anagram/ |
| Study plan | Top Interview 150 (Hashmap) |

## What it asks (own words)
Are the two strings rearrangements of each other?

## Key constraints
- Up to 5·10⁴ lowercase letters each.

## Approach
If the lengths differ, return false. Otherwise one array of 26 counts: +1 for s's letters, −1 for t's. All zeros means
anagrams.

## Why it works
Anagrams have identical letter multisets, which is exactly equal counts.

## Edge cases
- Different lengths → false immediately.

## Complexity
- Time: O(n)
- Space: O(26)

## Follow-up (Unicode)
Use a `Map` keyed by code point, and iterate with `for…of`, which walks code points rather than UTF-16 code units.
Otherwise astral characters (like emoji) are split into surrogate halves.

## Reusable pattern
**A single signed count array for "same multiset" checks.**
