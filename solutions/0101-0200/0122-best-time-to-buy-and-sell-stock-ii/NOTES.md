# 122. Best Time to Buy and Sell Stock II

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, dynamic-programming, greedy |
| Link | https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/ |
| Study plan | Top Interview 150 (Array / String) |

## What it asks (own words)
Trade as often as you like, holding at most one share and paying no fees. Maximize the profit.

## Key constraints
- Up to 3·10⁴ prices.

## Approach
Add up every positive day-to-day difference.

## Why it works
A trade bought on day a and sold on day b earns `p[b] − p[a] = Σ (p[i] − p[i−1])` over the days in between. The most a
set of trades can collect is every positive step, and trading day by day on each rise achieves exactly that. Buying
and selling on the same day is allowed, so consecutive rises chain together.

## Edge cases
- Monotonically rising → last − first. Falling → 0.

## Complexity
- Time: O(n)
- Space: O(1)

## Alternatives
The two-state machine from 714 with a fee of 0 gives the same answer and generalizes better.

## Reusable pattern
**Decompose a quantity into increments and keep only the good ones.** The telescoping-sum view explains why the greedy
is optimal.
