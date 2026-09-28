# 125. Valid Palindrome

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | two-pointers, string |
| Link | https://leetcode.com/problems/valid-palindrome/ |
| Study plan | Top Interview 150 (Two Pointers) |

## What it asks (own words)
Ignoring case and every character that isn't a letter or digit, does the string read the same both ways?

## Key constraints
- Up to 2·10⁵ printable ASCII characters.

## Approach
Converging two pointers: skip non-alphanumeric characters on either side, and compare the rest with `toLowerCase()`.

## Why it works
It compares exactly the filtered, lower-cased sequence from both ends without building it.

## Edge cases
- A string with no alphanumerics (" ") → true (the empty string is a palindrome).
- **Digits are alphanumeric**: "0P" is false. Filtering only letters is a common mistake.

## Complexity
- Time: O(n)
- Space: O(1)

## Alternatives
Filter with a regex (`/[^a-z0-9]/g`) and compare against the reverse: simpler, with O(n) extra space. That's the test
reference.

## Reusable pattern
**Two pointers with skip conditions** (compare 345, which reverses vowels).
