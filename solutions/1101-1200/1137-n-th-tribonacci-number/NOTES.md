# 1137. N-th Tribonacci Number

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | math, dynamic-programming, memoization |
| Link | https://leetcode.com/problems/n-th-tribonacci-number/ |
| Study plan | LeetCode 75 (DP - 1D) |

## What it asks (own words)
T₀ = 0, T₁ = T₂ = 1, and each later term is the sum of the previous three. Return Tₙ for n ≤ 37.

## Key constraints
- n ≤ 37 and the answer fits in 32 bits.

## Approach
Iterate from 3 to n, keeping only the last three values (a rolling window).

## Why it works
It's the recurrence evaluated bottom-up. Each value depends only on the three before it.

## Edge cases
- n = 0, 1, 2 are handled as base cases.

## Complexity
- Time: O(n)
- Space: O(1)

## Alternatives
- Naive recursion is exponential (about 3ⁿ calls) because of repeated subproblems, so memoization or iteration is
  essential.
- Matrix exponentiation gives O(log n), which is overkill here.

## Reusable pattern
**Linear recurrence → rolling variables.** Destructuring assignment `[a, b, c] = [b, c, a + b + c]` shifts the window
in one line.
