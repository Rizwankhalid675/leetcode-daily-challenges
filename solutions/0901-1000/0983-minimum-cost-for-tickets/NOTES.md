# 983. Minimum Cost For Tickets

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, dynamic-programming |
| Link | https://leetcode.com/problems/minimum-cost-for-tickets/ |
| Context | Study plan: Dynamic Programming |

## What it asks (own words)
You travel on given days of the year and can buy 1-, 7- or 30-day passes at given prices. Find the cheapest way to cover every travel day.

## Approach
`dp[d]` is the cheapest cost to cover all travel days up to day d. On a non-travel day nothing new is needed: `dp[d] = dp[d−1]`. On a travel day, the pass covering it can be assumed to end on day d, so take the best of: 1-day pass + dp[d−1], 7-day pass + dp[d−7], 30-day pass + dp[d−30] (indices clamped at 0).

## Why it works
Shifting a pass so that it ends on the latest travel day it covers never uncovers anything that matters for days ≤ d, so "pass ending at d" loses no generality.

## Edge cases
- Prices need not increase with duration; the min handles a 30-day pass cheaper than a 1-day pass.
- A single travel day.

## Complexity
- Time: O(last day) ≤ 365
- Space: O(last day)

## Testing note
Compared with an exhaustive recursion that tries every pass type starting at each uncovered travel day (up to 9 travel days).

## Reusable pattern
**DP over the time axis with look-back windows** for covering events with fixed-length intervals.
