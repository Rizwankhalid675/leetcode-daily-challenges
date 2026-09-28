# 136. Single Number

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, bit-manipulation |
| Link | https://leetcode.com/problems/single-number/ |
| Study plan | LeetCode 75 (Bit Manipulation) |

## What it asks (own words)
Every value appears exactly twice except one. Find it in linear time with constant extra space.

## Key constraints
- Up to 3·10⁴ values in ±3·10⁴, and O(1) extra space, which rules out a hash set.

## Approach
XOR all the values together.

## Why it works
XOR is commutative and associative, `x ^ x = 0`, and `x ^ 0 = x`. Reordering so equal values sit next to each other,
every pair becomes 0, leaving only the single value.

## JavaScript note
Bitwise operators work on 32-bit two's-complement integers. Negative values in this range round-trip correctly
(tested with −30000). Values beyond ±2³¹ would be truncated.

## Edge cases
- A single-element array.
- Negative numbers.

## Complexity
- Time: O(n)
- Space: O(1)

## Reusable pattern
**XOR cancellation.** Pairs vanish. Related: missing number (268), the "appears three times" generalization (137,
counting bits mod 3), and two single numbers (260, split by the lowest differing bit).
