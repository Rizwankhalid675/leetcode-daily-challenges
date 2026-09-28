# 1768. Merge Strings Alternately

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | two-pointers, string |
| Link | https://leetcode.com/problems/merge-strings-alternately/ |
| Study plan | LeetCode 75 (Array / String) |

## What it asks (own words)
Interleave two strings one character at a time, starting with the first; leftover characters of the longer string go
on the end.

## Key constraints
- Both lengths 1..100, so this is trivial in size. The point is clean index handling.

## Approach
A single index `i` runs up to the longer length. At each step, append `word1[i]` if it exists, then `word2[i]` if it
exists. Collect the pieces in an array and `join` once.

## Why it works
Position i of the output pair is exactly (word1[i], word2[i]), with missing characters skipped, which is the
definition of the merge. The tail of the longer string is handled by the same loop.

## Edge cases
- Equal lengths, and either string longer.
- Single characters.

## Complexity
- Time: O(n + m)
- Space: O(n + m) for the output

## Reusable pattern
**Two-sequence walk with bounds checks.** One loop to the longer length replaces the "main loop + two tail loops"
version and is harder to get wrong.
