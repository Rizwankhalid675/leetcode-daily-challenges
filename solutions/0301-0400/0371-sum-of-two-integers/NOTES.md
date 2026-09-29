# 371. Sum of Two Integers

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | math, bit-manipulation |
| Link | https://leetcode.com/problems/sum-of-two-integers/ |
| Context | Quest: Maths / Bit Operation Chip Laboratory / Basic Bit Operations |

## What it asks (own words)
Add two integers without using + or −.

## Approach
Binary addition split into two parts: a ^ b adds each bit column ignoring carries, and (a & b) << 1 is the carry into the next column. Feed the carry back as the new second operand until it is 0.

## Why it works
Each round the carry's lowest set bit moves at least one place left. JS bitwise operators work in two's-complement 32 bits, so with negative numbers the carry eventually shifts off the top (at most 32 rounds) instead of looping forever as it could with unbounded integers (e.g. Python). The final a is already a signed 32-bit value, and the true sum (|a + b| ≤ 2000) fits.

## Complexity
- Time: O(32) = O(1)
- Space: O(1)

## Testing note
Checked exhaustively against a + b for every pair in the allowed range (about 4·10⁶ pairs).

## Reusable pattern
**XOR = sum without carry, AND-shift = carry**: the ripple adder in software.
