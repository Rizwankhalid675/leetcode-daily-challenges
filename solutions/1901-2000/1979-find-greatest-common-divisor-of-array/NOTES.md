# 1979. Find Greatest Common Divisor of Array

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, math, number-theory, euclidean-algorithm, greatest-common-divisor |
| Link | https://leetcode.com/problems/find-greatest-common-divisor-of-array/ |
| Context | Quest: DSA / Strategy Summit / Number Theory |

## What it asks (own words)
Return the gcd of the array's smallest and largest values.

## Approach
One pass for min and max, then Euclid: gcd(a, b) = gcd(b, a mod b) until the remainder is 0.

## Why it works
Any common divisor of a and b also divides a mod b = a − q·b, and the reverse holds too, so each step keeps the set of common divisors the same while the numbers shrink.

## Complexity
- Time: O(n + log(max))
- Space: O(1)

## Testing note
Compared with a count-down trial-division gcd on random arrays.

## Reusable pattern
**Euclid's algorithm**: the go-to gcd in O(log) steps.
