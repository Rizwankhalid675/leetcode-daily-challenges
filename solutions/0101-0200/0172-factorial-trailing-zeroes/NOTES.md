# 172. Factorial Trailing Zeroes

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | math |
| Link | https://leetcode.com/problems/factorial-trailing-zeroes/ |
| Context | Quest: Maths / Number Theory Factor Encryption Station / Prime numbers, factors & number theory |

## What it asks (own words)
How many zeros does n! end with?

## Approach
A trailing zero is a factor 10 = 2·5, and n! always has more 2s than 5s. So count the 5s: every multiple of 5 contributes one, every multiple of 25 one more, and so on. Repeatedly dividing n by 5 and summing gives exactly that (Legendre's formula).

## Complexity
- Time: O(log₅ n)
- Space: O(1)

## Testing note
Compared with counting the zeros of an exact BigInt factorial for n ≤ 400.

## Reusable pattern
**Legendre's formula**: the exponent of prime p in n! is Σ ⌊n / p^i⌋.
