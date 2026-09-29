# 1015. Smallest Integer Divisible by K

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | hash-table, math, pigeonhole-principle |
| Link | https://leetcode.com/problems/smallest-integer-divisible-by-k/ |
| Context | Quest: Maths / Divisibility and Modular Arithmetic Data Cabin / Divisibility & Modular Arithmetic |

## What it asks (own words)
Find the length of the shortest number written with only 1s that k divides, or -1 if there is none.

## Approach
The repunits themselves overflow quickly, but only their remainder mod k matters: the next repunit is 10·prev + 1, so r ← (10r + 1) mod k. Stop when r hits 0.

## Why it works
Every repunit ends in 1, so it is odd and not a multiple of 5; k with a factor of 2 or 5 can never divide one. For other k, the remainders of the first k repunits either include 0 or repeat by pigeonhole; a repeat r(i) = r(j) means k divides R(j) − R(i) = R(j−i)·10^i, and since gcd(k, 10) = 1, k divides R(j−i). So some length ≤ k works and the loop bound of k is enough.

## Complexity
- Time: O(k)
- Space: O(1)

## Testing note
Compared with exact BigInt repunits for every k up to 300, plus a timing check near the maximum k.

## Reusable pattern
**Carry only the remainder**: when a sequence is built as x ← a·x + b, its value mod k follows the same rule, and pigeonhole bounds the search at k steps.
