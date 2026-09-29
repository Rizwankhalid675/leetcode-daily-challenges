# 1392. Longest Happy Prefix

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | string, rolling-hash, string-matching, hash-function, z-algorithm, knuth-morris-pratt-algorithm |
| Link | https://leetcode.com/problems/longest-happy-prefix/ |
| Context | Quest: DSA / Recursion Maze / Rolling Hash |

## What it asks (own words)
Find the longest string that is both a prefix and a suffix of s, without being all of s. Return "" if none exists.

## Key constraints
- Length up to 10^5, so the O(n^2) "compare every length" approach is risky.

## Approach
Compute the KMP prefix function `pi`, where `pi[i]` is the longest proper border of `s[0..i]`. The answer is `s.slice(0, pi[n - 1])`.

## Why it works
That is the definition of `pi` applied to the whole string. The prefix-function loop falls back through shorter borders (`j = pi[j - 1]`), and the total fallback work is bounded by the total increments, so it is linear.

## Edge cases
- Length 1: no proper border, so "".
- All the same letter: n - 1 characters.

## Complexity
- Time: O(n)
- Space: O(n)

## Testing note
Compared with direct prefix/suffix comparison on random a/b strings, plus max-size inputs for speed. KMP avoids the hash-collision risk of a rolling-hash solution.

## Reusable pattern
**Longest border = last entry of the prefix function.**
