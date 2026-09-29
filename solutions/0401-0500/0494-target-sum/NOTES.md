# 494. Target Sum

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, dynamic-programming, backtracking, knapsack-problem, 0-1-knapsack |
| Link | https://leetcode.com/problems/target-sum/ |
| Context | Quest: DSA / Strategy Summit / Dynamic Programming |

## What it asks (own words)
Put + or − in front of each number; how many sign choices make the total equal target?

## Key constraints
- Up to 20 numbers, each 0..1000, total at most 1000.
- Zeros are allowed (each zero doubles the count, since +0 and −0 are different expressions).

## Approach
Let P be the numbers given "+". Then sum(P) − (total − sum(P)) = target, so **sum(P) = (total + target) / 2**. If that isn't a non-negative integer (or |target| > total), the answer is 0. Otherwise count subsets with that sum using the classic 0/1 knapsack counting DP, iterating sums downward so each number is used at most once.

## Why it works
Sign assignments and subsets P are in one-to-one correspondence, so counting subsets counts expressions. Zeros are handled naturally: `dp[s] += dp[s - 0]` doubles every entry.

## Edge cases
- Odd total + target: no solution.
- Negative target: the formula still works, since want = (total + target)/2 ≥ 0 after the |target| ≤ total check.

## Complexity
- Time: O(n · total)
- Space: O(total)

## Testing note
Compared with enumerating all 2^n sign masks on random small inputs; plus zero-heavy cases and a C(20,10) closed-form check.

## Reusable pattern
**Turn a ± assignment into a subset-sum**: fix what the "+" group must add up to, then count subsets.
