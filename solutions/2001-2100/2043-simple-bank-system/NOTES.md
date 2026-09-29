# 2043. Simple Bank System

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, hash-table, design, simulation |
| Link | https://leetcode.com/problems/simple-bank-system/ |
| Context | Quest: System & Software Design / Business System Simulation Platform / Business System Simulation |

## What it asks (own words)
Simulate n numbered bank accounts (1-based) with transfer, deposit and withdraw. A transaction succeeds only if every account number exists and, for money leaving an account, the balance covers the amount. Return whether each one succeeded.

## Key constraints
- Balances and amounts go up to 10¹², with up to 10⁴ calls of each kind. Ten thousand deposits of 10¹² into one account reach 10¹⁶, which is past 2⁵³ ≈ 9·10¹⁵, where JS numbers stop representing every integer exactly.

## Approach
Straight simulation: check the account range, check the funds, then move the money. Balances are stored as **BigInt**, so comparisons stay exact even after a balance passes 2⁵³. The inputs are at most 10¹², so converting each one with `BigInt(money)` is exact. The methods only return booleans, so nothing needs converting back.

## Edge cases
- Account 0 or > n → false (and nothing changes).
- A transfer where both account numbers are valid but the balance is too low → false.
- Transferring to the same account succeeds and leaves the balance unchanged.

## Complexity
- Time: O(1) per operation, O(n) to build
- Space: O(n)

## Testing note
Random sequences on small amounts compared with a plain-number reference (including invalid account numbers). A separate test pushes one balance above 2⁵³ and checks that a single dollar is still tracked exactly.

## Reusable pattern
**Check the 2⁵³ budget for running sums**: when many large values can pile into one total, keep it as a BigInt.
