# 1621. Number of Sets of K Non-Overlapping Line Segments

| Field | Value |
|---|---|
| Daily Challenge date | 2026-09-16 |
| Solved | 2026-09-28, after the daily window (solved problem, not a completed Daily Challenge) |
| Difficulty | Medium |
| Topics | Math, Dynamic Programming, Combinatorics, Prefix Sum |
| Link | https://leetcode.com/problems/number-of-sets-of-k-non-overlapping-line-segments/ |
| Result | Accepted, 68/68 tests, 0 ms, 58.4 MB (submission 2156489328) |

## What it asks (own words)
Points sit at x = 0, 1, …, n−1. Draw exactly k segments, each between two distinct points. Segments may not overlap
but may share an endpoint. Count the ways modulo 10⁹+7.

## Key constraints
- n ≤ 1000, k ≤ n−1 → an O(n·k) DP (5·10⁵) is fine; a closed formula is even better.

## Reasoning
**DP view.** `dp[i][j]` = ways to draw j segments using points 0..i. Either no segment ends at i
(`dp[i−1][j]`), or the last segment is `[a, i]` for some a < i, leaving j−1 segments within 0..a:
`Σ_{a<i} dp[a][j−1]`. A running prefix sum makes each transition O(1). This is the independent oracle in the tests.

**Combinatorial view (the submitted solution).** Written left to right, the endpoints are
`a₁ < b₁ ≤ a₂ < b₂ ≤ … ≤ a_k < b_k`. The `≤` (shared endpoints) is what makes direct counting awkward. Fix it by
inserting one extra point in each of the k−1 gaps between consecutive segments, i.e. map `aᵢ → aᵢ + (i−1)` and
`bᵢ → bᵢ + (i−1)`. Now all 2k endpoints are strictly increasing within `0..n+k−2`, a set of n+k−1 points, and any
2k distinct points map back to a valid drawing. So the answer is **C(n+k−1, 2k)**.

## Algorithm
Compute C(n+k−1, 2k) mod p as `(∏ (top − i)) · (2k)!⁻¹`, with the inverse from Fermat's little theorem
`x⁻¹ ≡ x^(p−2) (mod p)` via fast exponentiation.

## Why it works
The shift map is a bijection between valid drawings and 2k-subsets of n+k−1 points (checked exhaustively for all
n ≤ 9, and against the DP up to n = 1000).

## JavaScript implementation details: BigInt is required here
- A product of two residues can be as large as (10⁹+7)² ≈ 10¹⁸, well above 2⁵³ ≈ 9·10¹⁵. With plain numbers the
  low digits are silently lost and the modulo result is wrong. So all modular multiplication uses **BigInt**
  (`1_000_000_007n`, `%`, `*`, `>>=`, `&`).
- Convert back with `Number(...)` at the end; the result is < p, so it's exact.
- The DP oracle only *adds* residues (< 2·10⁹), so it stays with plain numbers safely.

## Edge cases
- k = n−1: every unit segment [i, i+1] is used, which is the only way. C(2n−2, 2n−2) = 1.
- k = 1: C(n, 2), i.e. choose any two points.

## Bugs / debugging
- My first draft of the DP oracle tracked "open/closed segment" states and was convoluted enough that I didn't trust
  it. An oracle you can't trust defeats its purpose. I replaced it, **before running anything**, with the textbook
  prefix-sum DP, which is short enough to verify by eye. The submitted solution itself was unchanged.

## Alternatives considered
- The prefix-sum DP (O(n·k)) as a solution: perfectly acceptable, and it needs no modular inverse.
- Pascal's triangle up to row 2000: O(n²) memory/time, avoiding inverses.

## Complexity
- Time: O(k + log p).
- Space: O(1).

## Reusable pattern
**Stars and bars / "insert gaps" bijection.** When items must be non-decreasing, shifting the i-th item by i turns
"≤" into "<", and the count becomes a single binomial coefficient.

## What to take away personally
In JS, any modular *multiplication* with a ~10⁹ modulus needs BigInt (or a split multiplication). Addition is safe;
multiplication is not.
