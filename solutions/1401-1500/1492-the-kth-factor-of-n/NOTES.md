# 1492. The kth Factor of n

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | math, number-theory, prime-factorization |
| Link | https://leetcode.com/problems/the-kth-factor-of-n/ |
| Context | Quest: DSA / Strategy Summit / Number Theory |

## What it asks (own words)
List n's divisors in increasing order and return the k-th one, or −1 if there are fewer than k.

## Approach (follow-up: faster than O(n))
Every divisor d ≤ √n pairs with n/d ≥ √n. Scan d up to √n to collect the small divisors in increasing order. The large divisors are their partners, n/d, and taken in reverse order they also come out ascending. If n is a perfect square, √n shows up in both lists, so drop it from the large side.

## Edge cases
- n = 1: only one factor.
- Perfect squares (e.g. 4 → 1, 2, 4): no double counting.

## Complexity
- Time: O(√n)
- Space: O(number of divisors) — at most 32 for n ≤ 1000

## Testing note
Checked exhaustively against a linear scan for every (n, k) with 1 ≤ k ≤ n ≤ 1000, which is the whole input space.

## Reusable pattern
**Divisor pairing around √n**, the basis of most divisor enumeration.
