# 69. Sqrt(x)

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | math, binary-search, newtons-method |
| Link | https://leetcode.com/problems/sqrtx/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Return the integer square root of x (rounded down) without using a built-in power or square-root function.

## Approach
Binary search on the answer: find the largest `r` with `r·r ≤ x`. With `mid = ceil((lo+hi)/2)`, moving `lo = mid` always makes progress.

## Key constraints
- x ≤ 2³¹ − 1, so the answer is at most 46340 (46340² = 2,147,395,600 ≤ 2³¹ − 1 < 46341²). Capping `hi` there means `mid·mid` never exceeds about 2.15·10⁹, which is exact in a double.

## Edge cases
- x = 0 and x = 1.
- Perfect squares and the value just below them (2147395600 / 2147395599).

## Complexity
- Time: O(log min(x, 46340)) ≈ 16 steps
- Space: O(1)

## Testing note
Every result is checked with the defining inequality `r² ≤ x < (r+1)²`, and compared with `Math.floor(Math.sqrt(x))` (used only in tests) on random values across the full range.

## Reusable pattern
**Binary search on the answer** with a tight upper bound to keep the arithmetic exact.
