# 118. Pascal's Triangle

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, dynamic-programming |
| Link | https://leetcode.com/problems/pascals-triangle/ |
| Context | Quest: Maths / Combination and Permutation Module Library / Combinatorics & Permutations |

## What it asks (own words)
Return the first numRows rows of Pascal's triangle.

## Approach
Start from [1]. Each new row is 1, then the pairwise sums of neighbours in the previous row, then 1.

## Why it works
This is Pascal's rule C(n, k) = C(n−1, k−1) + C(n−1, k). The largest value (C(29, 14) ≈ 7.8·10⁷) is far below 2^53.

## Complexity
- Time: O(numRows²)
- Space: O(numRows²) for the output

## Testing note
Every entry of the 30-row triangle is compared with a directly computed binomial coefficient.

## Reusable pattern
**Pascal's rule as a DP**: the same recurrence computes C(n, k) mod p for combinatorics problems.
