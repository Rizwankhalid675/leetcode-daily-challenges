# 137. Single Number II

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, bit-manipulation |
| Link | https://leetcode.com/problems/single-number-ii/ |
| Context | Quest: Maths / Bitmask State Control Center / Bitmasking for Sets/states |

## What it asks (own words)
Every number appears three times except one, which appears once. Find it in linear time with constant extra space.

## Approach
Keep, for every bit position, how many times a 1 has been seen modulo 3, stored in two masks: **ones** (count ≡ 1) and **twos** (count ≡ 2). For each x:
- ones = (ones ^ x) & ~twos
- twos = (twos ^ x) & ~ones

A bit goes 0 → ones → twos → 0 as it is seen 1, 2, 3 times. Numbers seen three times clear themselves, leaving the single number in **ones**.

## Edge cases
- Negative values: JS bitwise ops use 32-bit two's complement, and the sign bit is counted like any other, so **ones** comes out as the right signed value.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Compared with a frequency Map on random shuffled inputs, including full-range negative values and the 32-bit extremes.

## Reusable pattern
**Per-bit counters mod k in bitmasks**: generalises "XOR cancels pairs" to any repetition count.
