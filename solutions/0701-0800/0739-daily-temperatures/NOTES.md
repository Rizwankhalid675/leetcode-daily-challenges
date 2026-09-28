# 739. Daily Temperatures

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, stack, monotonic-stack |
| Link | https://leetcode.com/problems/daily-temperatures/ |
| Study plan | LeetCode 75 (Monotonic Stack) |

## What it asks (own words)
For each day, how many days until a strictly warmer day? 0 if there isn't one.

## Key constraints
- n up to 10⁵ → an O(n²) scan could reach 10¹⁰ steps, so we need O(n).

## Approach
A **monotonic stack** of indices still waiting for a warmer day. Their temperatures are non-increasing from bottom to
top. For each new day i, pop every index j colder than day i and set `answer[j] = i − j`; then push i.

## Why it works
When j is popped, day i is the first day after j that's warmer. Anything between them was either not warmer or was
popped earlier, which means it was colder than something between. Each index is pushed and popped at most once.

## Edge cases
- Equal temperatures don't count as warmer (strict `<` when popping).
- Days left on the stack at the end keep answer 0.

## Complexity
- Time: O(n) amortized
- Space: O(n)

## Reusable pattern
**Next greater element → monotonic stack.** The same machinery is used in 901 (stock span), 84 (largest rectangle)
and 42 (trapping rain water).
