# 279. Perfect Squares

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | math, dynamic-programming, breadth-first-search, knapsack-problem, complete-knapsack |
| Link | https://leetcode.com/problems/perfect-squares/ |
| Context | Study plan: Top 100 Liked |

## What it asks (own words)
What is the fewest perfect squares that add up to n?

## Key constraints
- n ≤ 10⁴. An O(n√n) DP (~10⁶ steps) also passes; the math version is O(√n).

## Approach
Use two classical theorems:
- **Lagrange:** every positive integer is a sum of at most four squares.
- **Legendre:** it needs all four exactly when n has the form 4ᵃ(8b + 7).

So: 1 if n is a square; 4 if after removing factors of 4 the remainder is 7 mod 8; 2 if `n − a²` is a square for some a; otherwise 3.

## Edge cases
- n = 1 → 1; n = 7 → 4; n = 28 (= 4·7) → 4.

## Complexity
- Time: O(√n)
- Space: O(1)

## Testing note
Checked every n from 1 to 10⁴ against the textbook DP `f[i] = min(f[i − j²] + 1)`.

## Reusable pattern
**Unbounded-coin DP** (the oracle) — and, when available, a closed-form theorem that short-cuts it.
