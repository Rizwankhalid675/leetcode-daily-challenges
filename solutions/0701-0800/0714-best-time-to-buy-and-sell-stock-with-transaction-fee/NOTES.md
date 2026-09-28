# 714. Best Time to Buy and Sell Stock with Transaction Fee

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, dynamic-programming, greedy |
| Link | https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/ |
| Study plan | LeetCode 75 (DP - Multidimensional) |

## What it asks (own words)
Trade one share at a time, as often as you like, paying a fixed fee per completed transaction. Maximize the total
profit.

## Key constraints
- Up to 5·10⁴ days.

## Approach
A **state machine** with two states per day:
- `cash`: the best profit so far while holding nothing;
- `hold`: the best profit so far while holding one share.

Transitions: sell today → `cash = max(cash, hold + price − fee)`; buy today → `hold = max(hold, cash − price)`. Compute
both from the previous day's values, then return `cash`.

## Why it works
On any day you are in exactly one of the two states, and each state's best value depends only on the previous day's
two values. Charging the fee on the sell makes each full transaction pay it once.

## Edge cases
- Falling prices → 0 (never buy).
- A fee that cancels the gain → 0.
- `hold` starts at −∞, because you can't hold before buying.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Compared against exhaustive recursion over buy/sell/wait choices on 500 random price lists.

## Reusable pattern
**Stock problems = small state machines** (holding / not holding, plus cooldown or transaction-count states). The same
template solves 121, 122, 123, 188 and 309.
