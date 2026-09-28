# 3550. Smallest Index With Digit Sum Equal to Index

| Field | Value |
|---|---|
| Daily Challenge date | 2026-09-24 |
| Solved | 2026-09-28, after the daily window (solved problem, not a completed Daily Challenge) |
| Difficulty | Easy |
| Topics | Array, Math |
| Link | https://leetcode.com/problems/smallest-index-with-digit-sum-equal-to-index/ |
| Result | Accepted, 982/982 tests, 1 ms, 55 MB (submission 2156490663) |

## What it asks (own words)
Find the first position i where the digits of `nums[i]` add up to i. Return −1 if there's none.

## Key constraints
- n ≤ 100, values 0..1000 → digit sums ≤ 27 (for 999). So only indices 0..27 can ever match.

## Reasoning
This is a linear scan with a digit-sum helper. The observation that digit sums are at most 27 means you could even
stop at index 27; not needed at this size, but a useful habit.

## Algorithm
For i = 0..n−1: if `digitSum(nums[i]) === i`, return i. Return −1.

## Why it works
It evaluates the condition in index order, so the first match is the smallest.

## JavaScript implementation details
- `v % 10` gives the last digit; `Math.floor(v / 10)` drops it. JS `/` is float division, so the floor is
  required, unlike `//` in Python or integer `/` in Java.
- `digitSum(0)` returns 0 because the loop body never runs. Correct, and tested.

## Edge cases
- `[0]` → 0.
- Large index with a small value: index ≥ 28 can never match.

## Bugs / debugging
None. One of my own test lines was written confusingly (a leftover ternary) and was rewritten to a plain expected
value before running. Clear tests matter as much as clear code.

## Alternatives considered
- `String(v).split('').reduce(...)`: works, but allocates.

## Complexity
- Time: O(n · d), where d ≤ 4 digits.
- Space: O(1).

## Reusable pattern
**Digit extraction loop** (`% 10`, `/ 10`), the building block for digit sums, palindromic numbers, and digit DP.

## What to take away personally
Bound the possible values (digit sum ≤ 27) because it often shows which inputs can be skipped entirely.
