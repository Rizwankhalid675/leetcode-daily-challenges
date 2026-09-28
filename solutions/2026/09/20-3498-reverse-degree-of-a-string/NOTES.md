# 3498. Reverse Degree of a String

| Field | Value |
|---|---|
| Daily Challenge date | 2026-09-20 |
| Solved | 2026-09-28, after the daily window (solved problem, not a completed Daily Challenge) |
| Difficulty | Easy |
| Topics | String, Simulation |
| Link | https://leetcode.com/problems/reverse-degree-of-a-string/ |
| Result | Accepted, 933/933 tests, 1 ms, 54.8 MB (submission 2156490211) |

## What it asks (own words)
Give each letter a value from the *reversed* alphabet ('a' = 26 … 'z' = 1), multiply by its 1-based position in the
string, and sum.

## Key constraints
- Length ≤ 1000, so the maximum is 26 · (1+…+1000) = 13,013,000, which is tiny.

## Reasoning
This is pure simulation. The only detail is the mapping: with `code = charCode − 97` (a → 0, …, z → 25), the
reversed rank is `26 − code`.

## Algorithm
Sum `(26 − (charCode − 97)) · (i + 1)` over all i.

## Why it works
It's the definition, computed directly.

## JavaScript implementation details
- `charCodeAt(i) − 97` is the standard letter-to-index idiom ('a' is 97 in ASCII/UTF-16).
- Mind the 1-based position `(i + 1)` versus the 0-based loop index.

## Edge cases
- Single 'a' → 26; single 'z' → 1.
- Maximum-length string of 'a' → 26 · 500,500 (tested).

## Bugs / debugging
None.

## Alternatives considered
None needed.

## Complexity
- Time: O(n).
- Space: O(1).

## Reusable pattern
**Character arithmetic via char codes.** Mapping letters to 0..25 (or reversed, 25..0) comes up constantly: counting
arrays, Caesar shifts, per-letter state (see 940, 1520 this month).

## What to take away personally
Off-by-one hygiene: write down both index conventions (0-based loop, 1-based position) before coding.
