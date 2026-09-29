# 309. Best Time to Buy and Sell Stock with Cooldown

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, dynamic-programming |
| Link | https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/ |
| Context | Study plan: Dynamic Programming |

## What it asks (own words)
Trade one share at a time with unlimited transactions, but after selling you must sit out the next day. Maximize profit.

## Approach
Track three best balances at the end of each day:
- **hold**: currently owning a share — either held yesterday or bought today from **rest** (not from sold, which enforces the cooldown).
- **sold**: sold today — yesterday's hold plus today's price.
- **rest**: no share and not just sold — yesterday's rest or yesterday's sold (cooldown served).

Update all three from the previous day's values; the answer is the better of sold and rest.

## Edge cases
- One day: nothing to do, 0.
- Falling prices: never buy, 0 (hold starts at −Infinity so it never leaks into the answer).

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Compared with an exhaustive recursive search over buy/sell/wait decisions (up to 11 days).

## Reusable pattern
**Stock problems as small state machines**: each rule (cooldown, fee, k transactions) becomes a state or a transition restriction.
