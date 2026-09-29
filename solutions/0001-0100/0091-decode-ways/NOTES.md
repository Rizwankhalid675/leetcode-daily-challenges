# 91. Decode Ways

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | string, dynamic-programming |
| Link | https://leetcode.com/problems/decode-ways/ |
| Context | Study plan: Dynamic Programming |

## What it asks (own words)
Digits map to letters 1→A … 26→Z. Count the ways to split a digit string into valid codes (no leading zeros, values 1..26).

## Approach
Let ways(i) be the count for the first i digits. The last code is either one digit (valid unless it is '0') or two digits (valid if the pair is 10..26). So ways(i) = [s[i−1] ≠ '0']·ways(i−1) + [10 ≤ s[i−2..i−1] ≤ 26]·ways(i−2), with ways(0) = 1. Only two previous values are kept.

## Edge cases
- Leading '0' or "00" anywhere: 0.
- "10", "20": the zero must pair with the digit before it.
- "27" and up: cannot be a two-digit code.

## Overflow note
Only the answer is promised to fit in 32 bits (a string of 100 '1's would give about 5·10²⁰). Every value feeding the answer is one of its non-negative summands, so it is exact.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Compared with direct recursive splitting over digit strings rich in 0, 1, 2 and 6..9 (to hit every boundary).

## Reusable pattern
**Fibonacci-style DP with validity gates** on each transition.
