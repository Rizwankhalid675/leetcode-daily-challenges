# 204. Count Primes

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, math, enumeration, number-theory, primality-test, sieve-theory, prime-number-sieve |
| Link | https://leetcode.com/problems/count-primes/ |
| Context | Quest: Maths / Number Theory Factor Encryption Station / Prime numbers, factors & number theory |

## What it asks (own words)
How many primes are strictly smaller than n?

## Key constraints
n up to 5·10⁶, so trial division is too slow; a sieve with a compact typed array fits easily.

## Approach
Keep a Uint8Array of "composite" flags. Walking p upward, every unmarked p is prime; cross out its multiples starting at p², since smaller multiples already have a smaller prime factor and are crossed out.

## Edge cases
- n ≤ 2 gives 0 (strictly less than n).
- p·p can reach 2.5·10¹³ only if computed for large p; it is compared as a double, which stays exact.

## Complexity
- Time: O(n log log n)
- Space: O(n) bytes

## Testing note
Compared with trial division for every n ≤ 2000; checked against the known counts π(10⁶) = 78498 and π(5·10⁶) = 348513, with a timing check at the maximum.

## Reusable pattern
**Sieve of Eratosthenes with a Uint8Array**: the default tool whenever many primality answers up to ~10⁷ are needed.
