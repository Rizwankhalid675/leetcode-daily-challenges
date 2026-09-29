# 2223. Sum of Scores of Built Strings

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | string, binary-search, rolling-hash, suffix-array, string-matching, hash-function, z-algorithm, knuth-morris-pratt-algorithm |
| Link | https://leetcode.com/problems/sum-of-scores-of-built-strings/ |
| Context | Quest: DSA / Recursion Maze / Rolling Hash |

## What it asks (own words)
Build s one character at a time by prepending, so the i-th intermediate string is a suffix of s. Each suffix scores the length of its longest common prefix with s. Return the total score.

## Key constraints
- Length up to 10^5. The total can reach n(n+1)/2, about 5 * 10^9, which is well within exact double range.

## Approach
The Z-function gives, for every position `i`, the length of the longest common prefix of `s` and `s.slice(i)`. Compute it with the usual `[l, r)` "Z-box" and add everything up, with `n` for the whole string itself.

## Why it works
Inside the current Z-box, `s[i..r)` equals `s[i-l..r-l)`, so `z[i - l]` (capped at `r - i`) is a guaranteed lower bound. Only characters past `r` are compared directly, and `r` never moves back, giving linear time.

## Edge cases
- Single character: score 1.
- All equal letters: the maximum, n(n+1)/2.

## Complexity
- Time: O(n)
- Space: O(n)

## Testing note
Random a/b strings compared against direct LCP counting; the max-size all-'a' string checks speed and the closed form. The Z-function was chosen over hashing + binary search to avoid collision risk and the 2^53 multiplication issue.

## Reusable pattern
**"LCP of every suffix with the whole string" = Z-function.**
