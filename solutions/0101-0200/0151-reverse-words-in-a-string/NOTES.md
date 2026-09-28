# 151. Reverse Words in a String

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | two-pointers, string |
| Link | https://leetcode.com/problems/reverse-words-in-a-string/ |
| Study plan | LeetCode 75 (Array / String) |

## What it asks (own words)
Reverse the order of the words in a sentence that may have leading, trailing or repeated spaces. The output must have
exactly one space between words and none at the ends.

## Key constraints
- Length ≤ 10⁴, at least one word.

## Approach
`s.trim().split(/\s+/).reverse().join(' ')`.

## Why it works
`trim` removes the outer spaces, so `split(/\s+/)` produces no empty strings. Any run of spaces becomes one separator,
and `join(' ')` puts back exactly one space.

## Edge cases
- Without `trim`, leading spaces would give an empty first token, and the output would then have a trailing space.
- A single word.

## Complexity
- Time: O(n)
- Space: O(n)

## Alternatives
The follow-up asks for O(1) extra space where strings are mutable: reverse the whole character array, then reverse
each word, then compact the spaces. JS strings are immutable, so the idiomatic solution above is the right one here.
The in-place technique is worth knowing for C/C++ interviews.

## Reusable pattern
**Normalize whitespace with `trim` + `split(/\s+/)`.** And "reverse the whole, then reverse each part" for in-place
rotations and reversals.
