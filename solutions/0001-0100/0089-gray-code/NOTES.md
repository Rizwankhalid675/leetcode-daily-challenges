# 89. Gray Code

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | math, backtracking, bit-manipulation |
| Link | https://leetcode.com/problems/gray-code/ |
| Context | Quest: Maths / Bitmask State Control Center / Bitmasking for Sets/states |

## What it asks (own words)
List all 2^n values of n bits, starting at 0, so that neighbours (including last and first) differ in exactly one bit.

## Approach
Use the reflected binary Gray code g(i) = i ^ (i >> 1).

## Why it works
Going from i to i + 1 flips a run of trailing bits: the lowest 0 becomes 1 and the 1s below it become 0. In i ^ (i >> 1) each bit compares two neighbouring bits of i, and the run flips all neighbouring pairs inside it identically, so only the one pair at the top of the run changes. The map is a bijection (it can be undone by prefix-XOR), so every value appears once, and g(2^n − 1) = 2^(n−1), one bit from g(0) = 0.

## Complexity
- Time: O(2^n)
- Space: O(2^n) for the output

## Testing note
For every n ≤ 16 the result is checked structurally: length, starts at 0, all distinct and in range, and each cyclic neighbour pair differs by a single bit.

## Reusable pattern
**Gray code i ^ (i >> 1)**: enumerate subsets so that each step adds or removes exactly one element.
