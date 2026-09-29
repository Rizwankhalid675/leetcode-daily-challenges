# 60. Permutation Sequence

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | math, recursion |
| Link | https://leetcode.com/problems/permutation-sequence/ |
| Context | Quest: Maths / Combination and Permutation Module Library / Combinatorics & Permutations |

## What it asks (own words)
Give the k-th permutation of 1..n in lexicographic order, as a string.

## Approach
Use k − 1 (zero-based). With m digits left, each choice of leading digit covers (m − 1)! permutations, so the leading digit is the ⌊r / (m − 1)!⌋-th of the unused digits; keep r mod (m − 1)! for the rest.

## Why it works
Lexicographic order groups permutations by their first digit into blocks of equal size (m − 1)!. The block index is the quotient, and the position inside the block is the remainder; the same argument repeats on the remaining digits.

## Complexity
- Time: O(n²) because of splice (n ≤ 9)
- Space: O(n)

## Testing note
Compared with a next-permutation enumeration for every k and n ≤ 7, plus the first and last permutation of n = 9.

## Reusable pattern
**Factorial number system (Lehmer code)**: ranking and unranking permutations by dividing by factorials.
