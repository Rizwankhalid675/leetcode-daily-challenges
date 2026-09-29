# 2571. Minimum Operations to Reduce an Integer to 0

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | dynamic-programming, greedy, bit-manipulation |
| Link | https://leetcode.com/problems/minimum-operations-to-reduce-an-integer-to-0/ |
| Context | Quest: 2026 Spring Sprint / Week 2: Challenge / Challenge II |

## What it asks (own words)
Each operation adds or subtracts a power of two. What is the fewest operations that bring n down to 0?

## Key constraints
- 1 <= n <= 10^5.

## Approach
Scan bits from the lowest:
- If the low bit is 0, shift right. That bit is finished.
- If the low two bits are `01` (an isolated 1), subtract it: one operation, then shift.
- If the low two bits are `11` (the start of a run of ones), add 1: one operation turns the whole run into a single carry bit higher up.

## Why it works
A run of k ones costs k operations one bit at a time, but only 2 via "add the lowest, subtract the resulting top bit" (the top part may merge with the next run). For a single 1, subtracting (1 op) is never worse than adding. For two or more ones, carrying costs 1 op now and at most 1 later, which is never worse. This is the non-adjacent form of n, whose number of non-zero digits is the minimum.

## Edge cases
- Powers of two need exactly one operation.
- `3` = `11`: add 1 to get 4, then subtract 4, which is 2 operations.

## Complexity
- Time: O(log n)
- Space: O(1)

## Testing note
Compared with a BFS shortest path over [0, 2^18) using steps of plus/minus 2^i, for **every** n from 1 to 10^5. That covers the whole input range.

## Reusable pattern
**Carry runs of ones** (non-adjacent form): a block of 1-bits costs 2 operations as `2^high - 2^low`, whatever its length.
