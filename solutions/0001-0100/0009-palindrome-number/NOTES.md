# 9. Palindrome Number

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | math |
| Link | https://leetcode.com/problems/palindrome-number/ |
| Context | Quest: Maths / Arithmetic Reasoning Terminal Station / Arithmetic & Basic Reasoning |

## What it asks (own words)
Does the integer read the same forwards and backwards (the minus sign counts)?

## Approach
Negative numbers and numbers ending in 0 (other than 0 itself) cannot be palindromes. Otherwise, peel digits off the end into a reversed number until the reversed part is at least as large as what is left. Then compare the two halves; for an odd digit count, drop the middle digit from the reversed half.

## Edge cases
- 0 is a palindrome; 10, 100 are not (caught by the trailing-zero check, which the half-reversal needs).
- The reversed half never exceeds the original, so there is no overflow question.

## Complexity
- Time: O(log₁₀ x)
- Space: O(1)

## Testing note
Compared with a string reversal over a full small range plus random 32-bit values.

## Reusable pattern
**Reverse only half**: many digit-symmetry checks stop when the reversed suffix catches up with the prefix.
