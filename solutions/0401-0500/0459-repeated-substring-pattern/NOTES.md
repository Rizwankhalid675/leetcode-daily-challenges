# 459. Repeated Substring Pattern

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | string, string-matching, z-algorithm, knuth-morris-pratt-algorithm |
| Link | https://leetcode.com/problems/repeated-substring-pattern/ |
| Context | Quest: DSA / Sequence Valley / String Matching |

## What it asks (own words)
Is the string made of some shorter substring repeated two or more times?

## Approach
The doubling trick: s is periodic with a proper period iff s appears in `(s+s)` with the first and last characters removed.

## Why it works
If s = u^k (k ≥ 2), shifting by |u| lines up s inside s+s at an interior position. Conversely, an interior occurrence at offset p (0 < p < n) means s equals its rotation by p, which forces s to be a repetition of its prefix of length gcd(n, p).

## Complexity
- Time: O(n) with a linear string search (KMP; `includes` is typically fast)
- Space: O(n)

## Alternatives
Try every divisor length (the test oracle), or KMP's prefix function: s is periodic iff `n % (n − lps[n−1]) === 0` and lps[n−1] > 0.

## Reusable pattern
**Rotations and periodicity ↔ search in s + s** (compare 796).
