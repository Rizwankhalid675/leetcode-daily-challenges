# 509. Fibonacci Number

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | math, dynamic-programming, recursion, memoization |
| Link | https://leetcode.com/problems/fibonacci-number/ |
| Context | Study plan: Dynamic Programming |

## What it asks (own words)
Return the n-th Fibonacci number (F(0) = 0, F(1) = 1).

## Approach
Keep only the last two values and step forward n times: `(a, b) -> (b, a + b)`. After n steps `a` is F(n).

## Edge cases
- n = 0 returns 0 without entering the loop.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Compared with the naive exponential recursion for n up to 25, plus the known value F(30) = 832040.

## Reusable pattern
**A recurrence that only looks back k steps needs only k rolling variables**, not a full table.
