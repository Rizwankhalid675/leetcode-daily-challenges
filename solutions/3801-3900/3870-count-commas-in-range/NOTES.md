# 3870. Count Commas in Range

| Field | Value |
|---|---|
| Daily Challenge date | 2026-09-08 |
| Solved | 2026-09-28, after the daily window (solved problem, not a completed Daily Challenge) |
| Difficulty | Easy |
| Topics | Math |
| Link | https://leetcode.com/problems/count-commas-in-range/ |
| Result | Accepted, 999/999 tests, 204 ms, 61.8 MB (submission 2156488084) |

## What it asks (own words)
Write every integer from 1 to n with thousands separators (1,000 / 1,000,000 …). How many commas did you write in
total?

## Key constraints
- n ≤ 10⁵, so a loop over every number is at most 100,000 iterations.

## Reasoning
A number with *d* digits gets a comma after every group of three digits counted from the right, except before the
first group: ⌊(d − 1) / 3⌋ commas. 1–999 → 0, 1,000–999,999 → 1, and so on. Add that up for every number.

## Algorithm
For x = 1..n: `digits = String(x).length`; `total += ⌊(digits − 1)/3⌋`. Return `total`.

## Why it works
It applies the formatting rule to every number in range, which is the definition of the answer.

## JavaScript implementation details
- `String(x).length` is the simplest digit count, but it allocates a string per number. That's why this ran in
  204 ms instead of ~1 ms. `Math.floor(Math.log10(x)) + 1` avoids the allocation but has floating-point pitfalls
  near powers of 10, so the string version is the safer baseline.
- The test compares against `Intl.NumberFormat('en-US')`, JavaScript's real thousands-separator formatter. It's an
  independent oracle that uses the actual formatting rules.

## Edge cases
- n < 1000 → 0.
- n = 1000 → 1 (the first number with a comma).
- n = 10⁵ → 99,001 (every number from 1,000 to 100,000 has exactly one).

## Bugs / debugging
None.

## Optimization opportunity
Within the n ≤ 10⁵ constraint the answer is just `max(0, n − 999)`. Part II (3871) generalizes this into an
O(log n) formula for n up to 10¹⁵. The linear version is kept here because it's obviously correct and serves as
the oracle for Part II.

## Complexity
- Time: O(n · d) (string conversion per number).
- Space: O(d) for the temporary string.

## Reusable pattern
**Per-item formula + sum** as a first, verifiable version, which then becomes the test oracle for a faster version.

## What to take away personally
Use the platform's own implementation (`Intl.NumberFormat`) as a test oracle whenever the problem imitates
real-world behaviour.
