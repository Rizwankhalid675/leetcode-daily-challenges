# 43. Multiply Strings

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | math, string, simulation |
| Link | https://leetcode.com/problems/multiply-strings/ |
| Context | Study plan: Programming Skills |

## What it asks (own words)
Multiply two non-negative integers given as decimal strings (up to 200 digits) without converting them to numbers.

## Key constraints
- 200-digit values are way past 2⁵³; `Number` would lose precision (and `BigInt` is not the intended solution).

## Approach
The product has at most m + n digits. The digit at `num1[i]` times `num2[j]` contributes to position `i + j + 1` (from the left). Process from the right; add the product plus what's already there, keep the ones digit at `i + j + 1` and push the carry into `i + j`. Finally skip leading zeros.

## Why it works
Each cell is < 10 after it's written, and the carry into `i + j` is resolved later when that cell becomes the "`i + j + 1`" of a smaller `j` or smaller `i`; cell 0 only ever receives carries and never exceeds 9 because the product has at most m + n digits.

## Edge cases
- Either factor "0" → "0" (returned early to avoid output like "000").

## Complexity
- Time: O(m · n)
- Space: O(m + n)

## Testing note
Compared with `BigInt` multiplication on random numbers up to 200 digits.

## Reusable pattern
**Positional digit array with carry** (i + j indexing) for big-number arithmetic.
