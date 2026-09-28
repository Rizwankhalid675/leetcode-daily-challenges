# 58. Length of Last Word

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | string |
| Link | https://leetcode.com/problems/length-of-last-word/ |
| Study plan | Top Interview 150 (Array / String) |

## What it asks (own words)
Return the length of the last word in a string that may contain extra spaces anywhere.

## Key constraints
- Length ≤ 10⁴; at least one word.

## Approach
Scan backwards: skip trailing spaces, then count non-space characters until a space or the start.

## Why it works
The last word is the final maximal run of non-space characters; scanning from the end reaches it directly.

## Edge cases
- Trailing spaces (the main trap).
- A single word with no spaces.

## Complexity
- Time: O(length of the trailing spaces + last word), O(n) worst case
- Space: O(1)

## Alternatives
`s.trim().split(/ +/).pop().length` is a one-liner (and the test reference). It allocates arrays but is fine at this
size.

## Reusable pattern
**Scan from the end when only the suffix matters.**
