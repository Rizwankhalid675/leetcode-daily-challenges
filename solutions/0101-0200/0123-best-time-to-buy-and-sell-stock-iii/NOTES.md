# 123. Best Time to Buy and Sell Stock III

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | array, dynamic-programming |
| Link | https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Given daily prices, make at most two buy-then-sell transactions (never holding two at once) to maximize profit.

## Approach
Track the best cash balance after each stage, updated for every day's price `p`:
- `buy1 = max(buy1, −p)`: best after buying the first share.
- `sell1 = max(sell1, buy1 + p)`: best after completing one transaction.
- `buy2 = max(buy2, sell1 − p)`: best after buying the second share.
- `sell2 = max(sell2, buy2 + p)`: best after two transactions.

## Why in-place updates are fine
Using a value already updated today corresponds to buying and selling on the same day, which adds 0 profit. So it never creates a better (invalid) answer.

## Edge cases
- Falling prices: no transaction, 0.
- One transaction is best: `sell2` also covers it (the second buy/sell happens on the same day).

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Compared with an exhaustive recursion over (day, holding, transactions left) with k = 2 on random short price lists.

## Reusable pattern
**State-machine DP for stock problems**: one variable per (transaction count, holding) state. The general version is 188.
