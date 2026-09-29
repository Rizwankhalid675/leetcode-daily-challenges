# 50. Pow(x, n)

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | math, recursion |
| Link | https://leetcode.com/problems/powx-n/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Compute x raised to an integer power n (n can be negative, down to −2³¹).

## Approach
Binary exponentiation: walk the bits of `e = |n|` from low to high. Multiply `result` by the current `base` when the bit is 1, square `base` each step. For negative `n`, return `1 / result`.

## Key constraints
- `n = −2³¹`: in languages with 32-bit ints, `−n` overflows. In JS, `Math.abs` gives the exact 2147483648, and the loop halves with `Math.floor(e / 2)` rather than `e >> 1` (which would treat 2³¹ as a negative int32).
- The problem guarantees |xⁿ| ≤ 10⁴ and that x ≠ 0 when n ≤ 0.

## Edge cases
- `x = ±1` with huge `n` (the sign depends on n's parity).
- `|x| > 1` with `n = −2³¹`: the intermediate product overflows to Infinity and `1 / Infinity = 0`, which is the correct limit.
- `n = 0` gives 1.

## Complexity
- Time: O(log |n|), about 32 steps
- Space: O(1)

## Testing note
Compared with `Math.pow` using a relative tolerance on random inputs whose result is within the stated bound, plus explicit checks at n = ±2³¹-ish extremes.

## Reusable pattern
**Exponentiation by squaring**, with the JS-specific caveat: use arithmetic halving once values can exceed int32.
