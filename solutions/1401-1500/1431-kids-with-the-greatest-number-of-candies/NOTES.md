# 1431. Kids With the Greatest Number of Candies

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array |
| Link | https://leetcode.com/problems/kids-with-the-greatest-number-of-candies/ |
| Study plan | LeetCode 75 (Array / String) |

## What it asks (own words)
For each kid, if they alone received all the extra candies, would they have at least as many as every other kid?

## Key constraints
- n ≤ 100, values ≤ 100.

## Approach
Compute the maximum once. Kid i qualifies iff `candies[i] + extra >= max`.

## Why it works
Only kid i's count changes in each scenario, so the others' maximum is at most the global max. If kid i was
already the max, the condition holds trivially.

## Edge cases
- Ties count as "greatest" (≥, not >).
- Reaching the max exactly counts.

## Complexity
- Time: O(n)
- Space: O(n) for the result

## Reusable pattern
**Precompute the global aggregate once** instead of recomputing it per element. That turns O(n²) into O(n).

## JavaScript note
`Math.max(...arr)` spreads arguments onto the call stack. It's fine for 100 elements, but for arrays around 10⁵ or
more use a loop or `reduce`, because large spreads can throw "Maximum call stack size exceeded".
