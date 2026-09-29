# 322. Coin Change

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, dynamic-programming, breadth-first-search, knapsack-problem, complete-knapsack |
| Link | https://leetcode.com/problems/coin-change/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Given coin denominations (unlimited supply of each), find the fewest coins that add up to `amount`, or -1 if impossible.

## Approach
`dp[s]` = fewest coins that make exactly `s`. Start with `dp[0] = 0` and everything else "infinite" (`amount + 1`, more than any real answer). For each coin `c`, sweep `s` upward from `c`: `dp[s] = min(dp[s], dp[s − c] + 1)`. Sweeping upward lets a coin be reused.

## Edge cases
- `amount = 0`: 0 coins.
- Coins larger than `amount` (up to 2³¹ − 1): the inner loop never starts, so there's no overflow or huge array.
- Greedy (largest coin first) is wrong in general, e.g. `[1, 3, 4]` for 6.

## Complexity
- Time: O(coins · amount)
- Space: O(amount)

## Testing note
Oracle: BFS over amounts where each step adds one coin (the first time `amount` is reached is the minimum count). Random coin sets are checked, plus a 12-coin, amount-10⁴ timing run.

## Reusable pattern
**Unbounded knapsack (min count)**: one 1-D array, inner loop ascending.
