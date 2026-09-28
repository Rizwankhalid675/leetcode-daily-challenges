# 13. Roman to Integer

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | hash-table, math, string |
| Link | https://leetcode.com/problems/roman-to-integer/ |
| Study plan | Top Interview 150 (Array / String) |

## What it asks (own words)
Convert a valid Roman numeral (1–3999) to an integer.

## Key constraints
- Up to 15 symbols, and the input is always valid.

## Approach
Add each symbol's value, but **subtract** it when the next symbol is larger. That covers exactly the six subtractive
pairs (IV, IX, XL, XC, CD, CM).

## Why it works
In a valid numeral, symbols are non-increasing except in those pairs, where the smaller symbol is subtracted from the
following one. "Subtract when followed by something larger" encodes that rule locally.

## Edge cases
- Subtractive pairs at the start, middle or end ("MCMXCIV").

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Round-trip test: every n in 1..3999 is converted with the separately written 12 (Integer to Roman) and back, which
checks both solutions against each other.

## Reusable pattern
**Look-ahead to decide the sign of a contribution.**
