# 3871. Count Commas in Range II

| Field | Value |
|---|---|
| Daily Challenge date | 2026-09-09 |
| Solved | 2026-09-28, after the daily window (solved problem, not a completed Daily Challenge) |
| Difficulty | Medium |
| Topics | Math |
| Link | https://leetcode.com/problems/count-commas-in-range-ii/ |
| Result | Accepted, 1100/1100 tests, 1 ms, 55.8 MB (submission 2156488135) |

## What it asks (own words)
The same comma count as Part I (3870), but n can be as large as 10¹⁵, so we can't visit every number.

## Key constraints
- n ≤ 10¹⁵. Looping is impossible (about 10¹⁵ iterations).
- 10¹⁵ < 2⁵³ ≈ 9.007×10¹⁵, so JS numbers can represent n exactly. The largest answer is under 5×10¹⁵, which is
  also exact. This must be checked for any JS solution with big integers.

## Reasoning: swap the order of counting
Instead of "for each number, how many commas", count "for each comma position, how many numbers have it".
- A number has **at least one** comma iff it is ≥ 1,000.
- It has **at least two** iff it is ≥ 1,000,000, and so on: at least *c* commas iff x ≥ 10^(3c).

A number with exactly *c* commas is counted once in each of the first *c* thresholds, so it contributes exactly
*c*. Summing threshold counts therefore equals summing commas. The count of numbers in [1, n] that are ≥ T is
`n − T + 1` (when T ≤ n).

## Algorithm
`total = 0`; for T = 10³, 10⁶, 10⁹, … while T ≤ n: `total += n − T + 1`. Return `total`.

## Why it works
This is double counting: Σₓ commas(x) = Σₓ Σ_c [x ≥ 10^(3c)] = Σ_c #{x ≤ n : x ≥ 10^(3c)}.

## JavaScript implementation details
- `threshold *= 1000` stays exact (powers of ten up to 10¹⁵ are exactly representable).
- The test recomputes the same sum with **BigInt** for large n to prove there's no precision loss. BigInt is the
  right tool for checking exactness, even when the solution itself doesn't need it.
- A hand-derived check: for n = 10¹⁵, all five thresholds apply, so the answer is
  5·10¹⁵ − (10¹⁵ + 10¹² + 10⁹ + 10⁶ + 10³) + 5.

## Edge cases
- n < 1000 → the loop never runs → 0.
- n exactly equal to a threshold (e.g. 10⁶) contributes 1 for that threshold.

## Bugs / debugging
None. It was cross-checked against Part I's linear solution for random n ≤ 10⁵ and against BigInt for large n.

## Alternatives considered
- Summing by digit-length blocks: for each d, count the numbers with d digits × ⌊(d−1)/3⌋. Correct but more
  bookkeeping.
- BigInt everywhere: unnecessary given the 2⁵³ bound, and slower.

## Complexity
- Time: O(log₁₀₀₀ n), at most 5 iterations.
- Space: O(1).

## Reusable pattern
**Contribution technique / swapping summation order.** "Sum over items of (count of features)" often becomes easy as
"sum over features of (count of items that have it)".

## What to take away personally
When n is enormous, stop iterating items. Iterate the few thresholds, digits or bits instead. And always check
whether a JS number can hold the values exactly (the 2⁵³ rule).
