# 746. Min Cost Climbing Stairs

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, dynamic-programming |
| Link | https://leetcode.com/problems/min-cost-climbing-stairs/ |
| Study plan | LeetCode 75 (DP - 1D) |

## What it asks (own words)
Each step has a cost you pay when you leave it, moving up one or two steps. You may start on step 0 or step 1. What's
the cheapest way to reach the top, just past the last step?

## Key constraints
- Up to 1000 steps.

## Approach
Let dp[i] be the cheapest cost to *arrive* at step i. Starting on 0 or 1 is free: dp[0] = dp[1] = 0. You arrive at i
from i−1 (paying cost[i−1]) or from i−2 (paying cost[i−2]). The answer is dp[n]. Only two previous values are needed.

## Why it works
Optimal substructure: the cheapest route to step i ends with a one-step or two-step move, and whatever came before
that move must itself be the cheapest route to its starting step.

## Edge cases
- Two steps: jump straight from the cheaper start.
- Defining the state as "arrive at i before paying" avoids the off-by-one confusion around the top step, which has no
  cost.

## Complexity
- Time: O(n)
- Space: O(1)

## Reusable pattern
**Choose the DP state definition carefully** ("arrive before paying" versus "pay on landing"). A good definition makes
the base cases and the answer location obvious.
