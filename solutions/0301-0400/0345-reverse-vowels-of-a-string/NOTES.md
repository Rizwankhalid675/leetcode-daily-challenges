# 345. Reverse Vowels of a String

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | two-pointers, string |
| Link | https://leetcode.com/problems/reverse-vowels-of-a-string/ |
| Study plan | LeetCode 75 (Array / String) |

## What it asks (own words)
Reverse the order of the vowels (a, e, i, o, u in either case) in a string, leaving every other character where it
is.

## Key constraints
- Length up to 3·10⁵, printable ASCII, so linear time is needed.

## Approach
Convert to a character array. The `lo` pointer moves right past consonants and the `hi` pointer moves left past
consonants. When both rest on vowels, swap and move both.

## Why it works
The k-th vowel from the left is swapped with the k-th vowel from the right, which is exactly the reversal of the vowel
subsequence. Non-vowels are never moved.

## Edge cases
- No vowels, or a single vowel → unchanged.
- Uppercase vowels count, and each character keeps its own case when it moves.

## Complexity
- Time: O(n)
- Space: O(n) for the character array (JS strings are immutable)

## Reusable pattern
**Converging two pointers with skip conditions.** The same shape solves palindrome checks with non-alphanumeric
characters ignored (125).

## JavaScript note
Strings are immutable, so split into an array, mutate, then `join`. `[a[i], a[j]] = [a[j], a[i]]` is the idiomatic
swap. `new Set('aeiouAEIOU')` builds a set of characters directly from a string.
