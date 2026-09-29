# 263. Ugly Number

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | math |
| Link | https://leetcode.com/problems/ugly-number/ |
| Context | Quest: Maths / Divisibility and Modular Arithmetic Data Cabin / Divisibility & Modular Arithmetic |

## What it asks (own words)
Is n a positive number whose only prime factors are 2, 3 and 5?

## Approach
Strip every factor of 2, 3 and 5 by division. What remains is the part made of other primes; it equals 1 exactly when there were none.

## Edge cases
- n ≤ 0 returns false (0 would loop forever dividing by 2).
- 1 counts as ugly (no prime factors at all).

## Complexity
- Time: O(log n)
- Space: O(1)

## Testing note
Compared with a brute force that looks for any prime divisor other than 2, 3, 5.

## Reusable pattern
**Divide out allowed factors, then check the remainder** (the same idea tests whether a number is a power of k).
