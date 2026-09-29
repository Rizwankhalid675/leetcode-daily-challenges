# 645. Set Mismatch

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, hash-table, bit-manipulation, sorting |
| Link | https://leetcode.com/problems/set-mismatch/ |
| Context | Quest: DSA / Linear Shoal / Array II |

## What it asks (own words)
An array should hold 1..n once each, but one value was overwritten by a copy of another. Return [duplicate, missing].

## Approach
Count occurrences in an array indexed by value; count 2 → duplicate, count 0 → missing.

## Complexity
- Time: O(n)
- Space: O(n)

## Alternatives
O(1) space: sum and sum-of-squares equations (dup − miss and dup² − miss² determine both), or XOR partitioning, or marking visited indices by negation.

## Reusable pattern
**Values in 1..n → use the value as an index** (counting array or in-place sign marking; compare 448).
