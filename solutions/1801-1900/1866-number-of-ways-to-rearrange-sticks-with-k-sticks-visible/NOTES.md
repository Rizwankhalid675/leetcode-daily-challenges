# 1866. Number of Ways to Rearrange Sticks With K Sticks Visible

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | math, dynamic-programming, combinatorics |
| Link | https://leetcode.com/problems/number-of-ways-to-rearrange-sticks-with-k-sticks-visible/ |
| Context | Quest: Maths / Combination and Permutation Module Library / Combinatorics & Permutations |

## What it asks (own words)
Count the orderings of sticks of lengths 1..n where exactly k sticks are visible from the left (taller than everything before them), modulo 10⁹ + 7.

## Key constraints
n ≤ 1000, so an O(n·k) DP is about 10⁶ steps.

## Approach
Build the arrangement by inserting sticks from tallest to shortest, or equivalently think of where the shortest stick goes in an arrangement of i sticks:
- If the shortest stick is first, it is visible, and the rest (i − 1 taller sticks) must supply j − 1 visible ones.
- If it is anywhere else (i − 1 spots), it is hidden behind a taller stick and does not change what is visible among the others.

So dp[i][j] = dp[i−1][j−1] + (i−1)·dp[i−1][j], which is the unsigned Stirling number of the first kind. Only the previous row is kept.

## Why it works
Removing the shortest stick never changes whether any other stick is visible, since it cannot block anything. That gives the clean split above.

## Edge cases
- k = n: only the increasing order, answer 1.
- k = 1: the tallest stick must be first, (n − 1)! orders.
- Overflow: dp values are < 10⁹ + 7 and the multiplier is < 1000, so the product stays under about 10¹², far below 2^53; plain Number arithmetic is exact.

## Complexity
- Time: O(n·k)
- Space: O(k)

## Testing note
Compared with permutation enumeration (counting left-to-right maxima) for n ≤ 7, and with exact BigInt Stirling numbers for larger n to rule out precision loss; plus a max-size timing check.

## Reusable pattern
**"Where does the smallest element go?"** is the standard way to derive recurrences for permutation statistics (records, cycles, inversions).
