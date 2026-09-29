# 191. Number of 1 Bits

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | divide-and-conquer, bit-manipulation |
| Link | https://leetcode.com/problems/number-of-1-bits/ |
| Context | Quest: Maths / Bit Operation Chip Laboratory / Basic Bit Operations |

## What it asks (own words)
Count the 1 bits in the binary form of a positive integer.

## Approach
n & (n − 1) clears the lowest set bit, so the number of times this can happen before reaching 0 is the bit count. The loop runs once per set bit, not once per bit.

## Edge cases
- JS bitwise operators work on signed 32-bit values. The current problem only passes values below 2^31, but older versions passed unsigned 32-bit values (up to 2^32 − 1). Normalising with >>> 0 before and after each step makes both work.

## Complexity
- Time: O(number of set bits) ≤ 32
- Space: O(1)

## Testing note
Compared with counting '1' characters in the unsigned binary string, including values at and above 2^31.

## Reusable pattern
**n & (n − 1) drops the lowest set bit** (also: power-of-two test, subset enumeration).
