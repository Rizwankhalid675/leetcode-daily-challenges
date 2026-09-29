# 7. Reverse Integer

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | math |
| Link | https://leetcode.com/problems/reverse-integer/ |
| Context | Quest: Maths / Arithmetic Reasoning Terminal Station / Assignment (quiz) |

## What it asks (own words)
Reverse the decimal digits of a signed 32-bit integer, returning 0 when the result would leave the 32-bit range. The spirit is to do this without a 64-bit intermediate.

## Approach
Repeatedly take the last digit (x % 10, which keeps x's sign in JS) and drop it with Math.trunc. Before appending a digit, compare rev against 214748364 (the largest value that can still be multiplied by 10): if rev is past it, or equal and the next digit would push past 7 (or −8 on the negative side), answer 0.

## Why it works
2^31 − 1 = 2147483647 and −2^31 = −2147483648. rev·10 + d overflows exactly when rev > 214748364, or rev = 214748364 and d > 7 (and symmetrically for negatives with −8). So the out-of-range value is never formed, which matches the "no 64-bit storage" rule even though JS doubles could hold it.

## Edge cases
- Trailing zeros vanish (120 → 21).
- Math.trunc, not Math.floor, so negative numbers shrink toward 0.
- Results never become −0: rev starts at +0 and 0 + (−0) is +0.

## Complexity
- Time: O(log₁₀ |x|)
- Space: O(1)

## Testing note
Compared with a BigInt string-reversal reference on random 32-bit values and a dense small range, plus hand-picked boundary values.

## Reusable pattern
**Guard before the multiply**: check against LIMIT/10 before computing acc·10 + d (the same check atoi uses).
