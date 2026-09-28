# 374. Guess Number Higher or Lower

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | binary-search, interactive |
| Link | https://leetcode.com/problems/guess-number-higher-or-lower/ |
| Study plan | LeetCode 75 (Binary Search) |

## What it asks (own words)
A hidden number is in [1, n]. A provided `guess(num)` function says whether num is too high (−1), too low (1) or
correct (0). Find the number.

## Key constraints
- n up to 2³¹ − 1, so we need about 31 guesses at most, i.e. binary search.

## Approach
Classic binary search on [lo, hi]: guess the middle; −1 → search below; 1 → search above.

## Why it works
Each guess halves the remaining interval that must contain the pick, so it takes at most ⌈log₂ n⌉ + 1 guesses (≤ 32,
checked in the tests).

## JavaScript implementation details
- `lo + Math.floor((hi − lo) / 2)` instead of `(lo + hi) >> 1`. Bitwise operators convert to **32-bit signed
  integers**, and lo + hi can exceed 2³¹ − 1 here, so `>>` would give a negative number. (Java/C++ have the same
  overflow issue for other reasons.)
- `guess` is a global provided by LeetCode. The tests emulate it with `global.guess`.

## Edge cases
- n = 1; pick at either end of the range.

## Complexity
- Time: O(log n)
- Space: O(1)

## Reusable pattern
**Binary search on an answer range with an oracle.** Watch the midpoint computation in JS: `>>` is only safe while
values stay below 2³¹.
