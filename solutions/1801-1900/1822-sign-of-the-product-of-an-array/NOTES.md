# 1822. Sign of the Product of an Array

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, math |
| Link | https://leetcode.com/problems/sign-of-the-product-of-an-array/ |
| Context | Study plan: Programming Skills |

## What it asks (own words)
Return 1, −1 or 0 according to the sign of the product of the array.

## Key constraints
- Up to 1000 values of magnitude 100: the real product overflows even doubles (100¹⁰⁰⁰ → Infinity), so never compute it.

## Approach
Any zero → 0. Otherwise count negatives: an odd count gives −1.

## Edge cases
- Single negative; a zero anywhere.

## Complexity
- Time: O(n)
- Space: O(1)

## Testing note
Compared with the exact BigInt product; a 1000-element case shows why multiplying floats would fail.

## Reusable pattern
**Track only what you need (sign / parity) instead of the full value** to avoid overflow.
