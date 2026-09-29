# 518. Coin Change II

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, dynamic-programming, knapsack-problem, complete-knapsack |
| Link | https://leetcode.com/problems/coin-change-ii/ |
| Context | Study plan: Dynamic Programming |

## What it asks (own words)
Count the different multisets of coins (unlimited supply of each denomination) that add up to the amount.

## Key constraints
- Up to 300 distinct coins, amount ≤ 5000.
- Only the **final** answer is promised to fit in 32 bits.

## Approach
`dp[a]` = number of ways to form `a` using the coins processed so far. Adding coin c: `dp[a] += dp[a − c]` for a ascending (ascending allows reusing c any number of times). Because coins are the outer loop, each combination is built in one fixed coin order and counted once.

## Why it works
After processing coins c₁..cₖ, dp[a] counts multisets from those coins; the new coin either isn't used (old dp[a]) or is used at least once (dp[a − c] already including cₖ).

## Overflow note
Intermediate dp values for other amounts can be astronomically large (well past 2⁵³). That's harmless here: every value that actually feeds into `dp[amount]` is a non-negative term of it, so it is ≤ the final answer < 2³¹ and exact in a double. Values that are inexact only feed amounts we never read (and there is no subtraction, so no NaN risk). No BigInt needed.

## Edge cases
- amount = 0: one way (use nothing).
- No combination: 0.

## Complexity
- Time: O(coins · amount)
- Space: O(amount)

## Testing note
Compared with explicit enumeration of coin multiplicities on small inputs, and with a BigInt version of the DP on large random inputs whose true answer fits in 32 bits, including a crafted case where intermediate counts exceed 2⁵³.

## Reusable pattern
**Combinations vs. permutations: items in the outer loop count combinations; the target in the outer loop counts orderings** (compare 377).
