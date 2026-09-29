# 214. Shortest Palindrome

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | string, rolling-hash, string-matching, hash-function, manacher, z-algorithm, knuth-morris-pratt-algorithm |
| Link | https://leetcode.com/problems/shortest-palindrome/ |
| Context | Quest: DSA / Recursion Maze / Rolling Hash |

## What it asks (own words)
Add as few characters as possible to the front of a string to make it a palindrome, and return the result.

## Key constraints
- Length 0 to 5 * 10^4, lowercase letters. O(n^2) palindrome checks would be too slow on inputs like `aaaa...b...aaaa`.

## Approach
Only the longest palindromic prefix can stay unmatched; everything after it must be mirrored in front. Build `t = s + '#' + reverse(s)` and run the KMP prefix function. The last value is the longest prefix of `s` that is also a suffix of `reverse(s)`, which is exactly the longest palindromic prefix. Prepend `reverse(s)` minus that many trailing characters.

## Why it works
A prefix `p` of `s` is a palindrome iff `p` equals the reverse of itself, i.e. iff `p` appears as a suffix of `reverse(s)`. The `#` separator (not a lowercase letter) prevents a border longer than `s`.

## Edge cases
- Empty string returns empty.
- Already a palindrome: nothing is added.

## Complexity
- Time: O(n)
- Space: O(n)

## Testing note
Random a/b strings compared with a brute-force "try every prefix" solution; the adversarial max-size case checks both speed and output. KMP was chosen over rolling hashing so the result is deterministic (no collision risk).

## Reusable pattern
**Palindromic prefix = border of s + sep + reverse(s).**
