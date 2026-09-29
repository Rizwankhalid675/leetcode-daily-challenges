# 2523. Closest Prime Numbers in Range

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | math, number-theory, primality-test, sieve-theory, prime-number-sieve |
| Link | https://leetcode.com/problems/closest-prime-numbers-in-range/ |
| Context | Quest: Maths / Number Theory Factor Encryption Station / Prime numbers, factors & number theory |

## What it asks (own words)
Among primes in [left, right], return the pair with the smallest difference (the smaller pair on ties), or [-1, -1] if there are fewer than two primes.

## Approach
Sieve up to right. The closest pair must be consecutive primes, so scan the range once, comparing each prime with the previous one and only replacing the answer on a strictly smaller gap (that keeps the earliest pair on ties).

## Why it works
Any non-adjacent pair has a gap at least as large as an adjacent pair between them, which also comes earlier. Twin primes (gap 2) cannot be beaten except by (2, 3), which would appear first, so the scan can stop at gap ≤ 2.

## Edge cases
- 1 is not prime (marked composite explicitly).
- Ranges with 0 or 1 primes return [-1, -1].

## Complexity
- Time: O(right log log right)
- Space: O(right) bytes

## Testing note
Compared with an all-pairs search over trial-division primes on random small ranges, plus a timing check at the maximum.

## Reusable pattern
**Closest pair in sorted data is adjacent**: after sorting (or sieving in order), only neighbours need comparing.
