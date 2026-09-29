# 188. Best Time to Buy and Sell Stock IV

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | array, dynamic-programming |
| Link | https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Same as the two-transaction stock problem, but at most `k` transactions.

## Approach
Generalize the four-variable solution of 123 to arrays:
- `buy[j]`: best balance while holding the share of the j-th transaction.
- `sell[j]`: best balance after completing j transactions.

For each day's price `p` and each `j`: `buy[j] = max(buy[j], sell[j−1] − p)`, `sell[j] = max(sell[j], buy[j] + p)`. The answer is `sell[k]`.

**Shortcut:** a transaction needs two different days, so at most ⌊n/2⌋ profitable transactions are possible. If `2k ≥ n`, the limit never binds and the answer is the sum of all positive day-to-day increases.

## Edge cases
- A single day: 0.
- `k` much larger than needed (handled by the shortcut).

## Complexity
- Time: O(n·k), or O(n) with the shortcut
- Space: O(k)

## Testing note
Compared with an exhaustive recursion over (day, holding, transactions left) for random k and short price lists. A k = 100, n = 1000 run checks speed.

## Reusable pattern
**Stock state machine with a transaction index**, plus **the "limit can't bind" shortcut**.
