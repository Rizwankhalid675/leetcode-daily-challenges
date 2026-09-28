# 30. Substring with Concatenation of All Words

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | hash-table, string, sliding-window |
| Link | https://leetcode.com/problems/substring-with-concatenation-of-all-words/ |
| Study plan | Top Interview 150 (Sliding Window) |

## What it asks (own words)
All words have the same length L. Find every start index in s where some ordering of *all* the words (duplicates
included) appears back to back.

## Key constraints
- |s| ≤ 10⁴, up to 5000 words, L ≤ 30.

## Approach
Any valid start is `offset + m·L` for some offset in `[0, L)`. For each offset, run a **sliding window that moves one
word at a time**, keeping a word-count map:
- an unknown word → reset the window just past it;
- a word used more often than needed → drop words from the left until it isn't;
- all k words present → record `left`, then drop the leftmost word to keep sliding.

## Why it works
Within one offset, word boundaries are fixed, so the problem becomes "subarray of tokens that is a permutation of a
multiset", which is a classic count-map sliding window. The L offsets cover every possible start.

## Edge cases
- Duplicate words in the list (the counts handle it).
- Overlapping matches ("aaaaaa" with ["aa","aa"] → 0, 1, 2 across different offsets).
- s shorter than the total length → [].

## Complexity
- Time: O(L · |s|/L · L) = O(|s| · L) for slicing
- Space: O(k)

## Testing note
Compared against a brute force that checks every start by sorting its k tokens, with tiny alphabets and duplicate-heavy
word lists.

## Reusable pattern
**Sliding window over tokens instead of characters,** once per alignment offset.
