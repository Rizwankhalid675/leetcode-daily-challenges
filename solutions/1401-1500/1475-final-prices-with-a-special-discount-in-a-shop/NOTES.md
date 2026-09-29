# 1475. Final Prices With a Special Discount in a Shop

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, stack, monotonic-stack |
| Link | https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop/ |
| Context | Quest: DSA / Linear Shoal / Monotonic Stack |

## What it asks (own words)
Each item's discount is the price of the first later item priced at most as much; return prices after discounts.

## Approach
Monotonic stack of indices without a discount yet (prices strictly increasing on the stack). A new price p resolves every stacked index whose price is ≥ p.

## Complexity
- Time: O(n)
- Space: O(n)

## Reusable pattern
**Next smaller-or-equal element** = monotonic stack (mirror of 739's next greater).
