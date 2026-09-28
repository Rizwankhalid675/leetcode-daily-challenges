# 189. Rotate Array

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, math, two-pointers |
| Link | https://leetcode.com/problems/rotate-array/ |
| Study plan | Top Interview 150 (Array / String) |

## What it asks (own words)
Shift the array right by k positions in place; elements that fall off the end wrap to the front.

## Key constraints
- n and k up to 10⁵, and **k can exceed n**. The follow-up asks for O(1) extra space.

## Approach
**Triple reversal** (after `k %= n`): reverse all, then reverse the first k, then reverse the remaining n − k.

## Why it works
Write the array as A B, where B is the last k elements. The goal is B A. Reversing everything gives Bᴿ Aᴿ, and reversing
each part individually restores its order: B A.

## Edge cases
- k = 0 or k = n → unchanged. k > n → use k mod n.
- With k = 0 after the modulo, `reverse(0, −1)` is a harmless no-op.

## Complexity
- Time: O(n)
- Space: O(1)

## Alternatives
- Copy into a new array at index `(i + k) % n` (O(n) space).
- Cyclic replacements following the gcd(n, k) cycles (O(1) space, trickier to get right).

## Reusable pattern
**Reverse the whole, then reverse the parts.** The same trick reverses the words in a string in place (151's
follow-up).
