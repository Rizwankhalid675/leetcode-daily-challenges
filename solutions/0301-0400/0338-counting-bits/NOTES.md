# 338. Counting Bits

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | dynamic-programming, bit-manipulation |
| Link | https://leetcode.com/problems/counting-bits/ |
| Study plan | LeetCode 75 (Bit Manipulation) |

## What it asks (own words)
For every number from 0 to n, count the 1-bits in its binary form, in linear time and without a built-in popcount.

## Key constraints
- n ≤ 10⁵, and the follow-up asks for O(n) in a single pass.

## Approach
DP on bits: `bits(i) = bits(i >> 1) + (i & 1)`.

## Why it works
Shifting right by one removes the lowest bit, whose value is `i & 1`. Every other bit is unchanged, so the count
splits exactly. Since `i >> 1 < i`, its answer is already computed.

## Edge cases
- n = 0 → [0].

## Complexity
- Time: O(n)
- Space: O(n) for the output

## Alternatives
`bits(i) = bits(i & (i − 1)) + 1`: `i & (i − 1)` clears the lowest set bit (Brian Kernighan's trick). It works equally
well.

## Reusable pattern
**DP over integers via bit relationships** (`i >> 1`, `i & (i−1)`). The test checks every value up to 10⁵ against
`toString(2)`.
