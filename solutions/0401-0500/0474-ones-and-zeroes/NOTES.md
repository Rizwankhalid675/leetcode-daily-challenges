# 474. Ones and Zeroes

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, string, dynamic-programming, knapsack-problem, 0-1-knapsack |
| Link | https://leetcode.com/problems/ones-and-zeroes/ |
| Context | Study plan: Dynamic Programming |

## What it asks (own words)
Pick as many binary strings as possible such that, all together, they use at most m zeros and n ones.

## Approach
Each string is an item with a two-dimensional weight (zeros, ones) and value 1. Classic 0/1 knapsack: for each string, update `dp[i][j] = max(dp[i][j], dp[i − zeros][j − ones] + 1)`, looping both capacities **downward** so a string is used at most once. The table is a flat typed array of (m+1)·(n+1).

## Edge cases
- A string that alone exceeds the budget is skipped.
- Duplicate strings are separate items.

## Complexity
- Time: O(L + |strs| · m · n), where L is the total string length
- Space: O(m · n)

## Testing note
Compared with checking every subset (up to 10 strings).

## Reusable pattern
**Multi-dimensional 0/1 knapsack**: one dp dimension per resource, iterate every capacity dimension in reverse.
