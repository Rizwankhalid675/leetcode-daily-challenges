# 520. Detect Capital

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | string |
| Link | https://leetcode.com/problems/detect-capital/ |
| Context | Quest: DSA / Sequence Valley / String |

## What it asks (own words)
Is the capitalization one of: ALL CAPS, all lowercase, or Capitalized?

## Approach
The three cases collapse to: whole word upper, or everything after the first letter lower (covers both lowercase and Capitalized).

## Edge cases
- "gOOGLE" (lowercase first, upper rest) → false.
- One-letter words → true.

## Complexity
- Time: O(n)
- Space: O(n) for the case-converted copies

## Reusable pattern
Collapse overlapping rule cases into fewer checks.
