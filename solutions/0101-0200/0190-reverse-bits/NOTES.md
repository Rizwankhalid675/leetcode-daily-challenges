# 190. Reverse Bits

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | divide-and-conquer, bit-manipulation |
| Link | https://leetcode.com/problems/reverse-bits/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Reverse the order of the 32 bits of an integer.

## Approach
Loop 32 times: shift `result` left and append `n`'s lowest bit, then shift `n` right with `>>>` so no sign bits are pulled in.

## Key constraints
- JS bitwise operators work on signed 32-bit integers. If the reversed value has bit 31 set, `result` is negative, so the final `>>> 0` turns it into the unsigned value LeetCode expects.

## Edge cases
- Input 1 gives 2³¹ (would be negative without `>>> 0`).
- Input 0 gives 0.

## Complexity
- Time: O(32)
- Space: O(1)

## Testing note
Compared with a string-based reversal (pad to 32 bits, reverse, parse) on random 32-bit values, including inputs with bit 31 set in case the input arrives as an unsigned number.

## Reusable pattern
**Unsigned results in JS need `>>> 0`.**
