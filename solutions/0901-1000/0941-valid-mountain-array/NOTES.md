# 941. Valid Mountain Array

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array |
| Link | https://leetcode.com/problems/valid-mountain-array/ |
| Context | Quest: DSA / Linear Shoal / Assignment I (quiz) |

## What it asks (own words)
Is the array strictly increasing up to some interior peak and strictly decreasing after it?

## Approach
Walk up while strictly increasing; the peak must not be the first or last index; then walk down while strictly decreasing; valid iff we reach the end.

## Edge cases
- Plateaus (equal neighbours) break both walks → false.
- Only increasing or only decreasing → false.

## Complexity
- Time: O(n)
- Space: O(1)

## Reusable pattern
Two-phase scan with explicit checks on where the phase boundary lands.
