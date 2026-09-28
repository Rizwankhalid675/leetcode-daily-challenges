# 121. Best Time to Buy and Sell Stock

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, dynamic-programming |
| Link | https://leetcode.com/problems/best-time-to-buy-and-sell-stock/ |
| Study plan | Top Interview 150 (Array / String) |

## What it asks (own words)
Buy once and sell once later. What's the maximum profit (0 if every trade would lose money)?

## Key constraints
- Up to 10⁵ prices, so all pairs (O(n²)) is too slow.

## Approach
Scan once, tracking the minimum price seen so far. Treat each day as a potential selling day; its best profit is
`price − minSoFar`.

## Why it works
For a fixed selling day, the best buying day is the cheapest earlier one. Maximizing over all selling days covers
every valid pair.

## Edge cases
- Falling prices → 0.
- A single day → 0.

## Complexity
- Time: O(n)
- Space: O(1)

## Reusable pattern
**"Best pair (i < j)" → a running prefix minimum or maximum.** It's also the one-transaction case of the stock state
machine (714).
