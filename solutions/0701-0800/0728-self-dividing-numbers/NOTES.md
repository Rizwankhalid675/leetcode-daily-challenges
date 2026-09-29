# 728. Self Dividing Numbers

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | math |
| Link | https://leetcode.com/problems/self-dividing-numbers/ |
| Context | Quest: Maths / Divisibility and Modular Arithmetic Data Cabin / Divisibility & Modular Arithmetic |

## What it asks (own words)
List the numbers in [left, right] that are divisible by each of their own digits (a 0 digit disqualifies the number).

## Approach
Walk the range and peel digits with % 10. Reject as soon as a digit is 0 or does not divide the number.

## Complexity
- Time: O((right − left + 1) · digits) = O(n log n)
- Space: O(1) besides the output

## Testing note
Compared against a string-digit version across the whole allowed range.

## Reusable pattern
**Digit extraction by % 10 and integer division** instead of string conversion.
