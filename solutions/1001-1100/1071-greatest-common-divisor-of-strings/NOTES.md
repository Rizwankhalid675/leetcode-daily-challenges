# 1071. Greatest Common Divisor of Strings

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | math, string |
| Link | https://leetcode.com/problems/greatest-common-divisor-of-strings/ |
| Study plan | LeetCode 75 (Array / String) |

## What it asks (own words)
Find the longest string that, repeated some number of times, produces each of the two inputs. Return "" if none
exists.

## Key constraints
- Lengths up to 1000, uppercase letters.

## Approach
1. **Commutation test:** if `str1 + str2 !== str2 + str1`, there is no common divisor, so return "".
2. Otherwise the answer is the prefix of `str1` of length `gcd(len1, len2)`.

## Why it works
- If x divides both, then `str1 = x^a` and `str2 = x^b`, so both concatenations equal `x^(a+b)`. They must match.
- If the concatenations match, a classic result on strings (two words commute iff they are powers of a common word)
  says both are powers of some primitive word w. Every common divisor is then a power of w whose length divides both
  lengths. The longest has length gcd(len1, len2), exactly as with integers.

## Edge cases
- One string is a repetition of the other ("ABCABC", "ABC").
- The same letters in a different pattern ("AAAAAB", "AAA") fail the commutation test.

## Complexity
- Time: O(n + m) for the concatenation comparison, plus O(log) for gcd
- Space: O(n + m) for the concatenated strings

## Reusable pattern
**Map a string problem onto integer arithmetic.** Divisibility of repeated strings behaves like divisibility of
their lengths once the strings are known to share a base unit. The tests check this against brute force over every
candidate prefix.
