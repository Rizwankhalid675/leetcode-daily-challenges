# 1672. Richest Customer Wealth

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, matrix |
| Link | https://leetcode.com/problems/richest-customer-wealth/ |
| Context | Study plan: Programming Skills |

## What it asks (own words)
Each row is one customer's bank balances; return the largest row total.

## Approach
Sum every row, track the maximum. Starting at 0 is safe because all balances are positive.

## Complexity
- Time: O(m · n)
- Space: O(1)

## Testing note
Compared with a `map`/`reduce`/`Math.max` one-liner on random grids.

## Reusable pattern
**Row aggregate then max.**
