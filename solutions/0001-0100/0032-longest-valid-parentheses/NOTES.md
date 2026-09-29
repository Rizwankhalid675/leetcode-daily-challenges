# 32. Longest Valid Parentheses

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | string, dynamic-programming, stack, bracket-sequences |
| Link | https://leetcode.com/problems/longest-valid-parentheses/ |
| Context | Study plan: Top 100 Liked |

## What it asks (own words)
Find the length of the longest contiguous substring of a parentheses string that is correctly balanced.

## Key constraints
- Up to 3·10⁴ characters, so O(n²) scanning is borderline; aim for O(n).

## Approach
Keep a stack of indices whose bottom is always the index of the last unmatched `)` (initially the sentinel −1).
- `(`: push its index.
- `)`: pop. If the stack became empty, this `)` is unmatched — push its index as the new base. Otherwise the valid run ending here starts right after the new top, so its length is `i − top`.

## Why it works
After popping, the top is either an unmatched `(` or the last unmatched `)` — in both cases everything strictly between it and `i` is balanced, and nothing further left can be included.

## Edge cases
- Empty string → 0.
- Nested and adjacent groups such as `()(())` join into one run (6).

## Complexity
- Time: O(n)
- Space: O(n)

## Testing note
Compared with an O(n²) balance-scanning brute force on random strings, plus a 3·10⁴-length timing check.

## Reusable pattern
**Stack with a sentinel "last barrier" index** for longest-valid-run questions.
