# 66. Plus One

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, math |
| Link | https://leetcode.com/problems/plus-one/ |
| Context | Quest: DSA / Linear Shoal / Assignment I (quiz) |

## What it asks (own words)
A big integer is given as an array of decimal digits; return the digits of that number plus one.

## Approach
From the last digit: if it's below 9, increment and stop; otherwise set it to 0 and continue left. If every digit was 9, prepend 1.

## Complexity
- Time: O(n) worst case (all nines), O(1) typical
- Space: O(n) for the copy/result

## JavaScript note
Up to 100 digits — converting to Number loses precision; BigInt works (used as the test oracle) but the digit loop is the intended solution.

## Reusable pattern
Carry propagation with early exit.
