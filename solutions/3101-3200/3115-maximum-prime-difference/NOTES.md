# 3115. Maximum Prime Difference

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, math, number-theory, primality-test |
| Link | https://leetcode.com/problems/maximum-prime-difference/ |
| Context | Quest: DSA / Strategy Summit / Number Theory |

## What it asks (own words)
Find the largest distance between the positions of two primes in the array (the same prime twice gives distance 0). At least one prime is guaranteed.

## Approach
Sieve primality for 0..100 once. The widest pair is always the first prime with the last prime, so scan in from both ends.

## Edge cases
- Exactly one prime: first = last, answer 0.
- 1 is not prime.

## Complexity
- Time: O(n) (the sieve over 100 values is constant)
- Space: O(1)

## Testing note
Compared with an all-pairs scan using trial-division primality on random arrays.

## Reusable pattern
**Max index distance for a predicate = last match − first match**; no need to look at interior pairs.
