# 2472. Maximum Number of Non-overlapping Palindrome Substrings

| Field | Value |
|---|---|
| Daily Challenge date | 2026-09-15 |
| Solved | 2026-09-28, after the daily window (solved problem, not a completed Daily Challenge) |
| Difficulty | Hard |
| Topics | Two Pointers, String, Dynamic Programming, Greedy |
| Link | https://leetcode.com/problems/maximum-number-of-non-overlapping-palindrome-substrings/ |
| Result | Accepted, 56/56 tests, 4 ms, 54.8 MB (submission 2156489278) |

## What it asks (own words)
Pick as many non-overlapping palindromic substrings as possible from `s`, where each has length at least `k`.
Return how many you can pick.

## Key constraints
- |s| ≤ 2000. O(n²) is fine (4M), and O(n·k) is even better.

## Reasoning
The general DP is `dp[i] = max(dp[i−1], max over palindromic s[j..i) with i−j ≥ k of dp[j] + 1)`. That needs a
palindrome table (O(n²)) and O(n²) transitions. It works, and it's the test oracle.

**Shrinking trick.** If `s[j..i)` is a palindrome, removing its first and last characters leaves a palindrome that
is still inside the same span. So any selected palindrome of length L ≥ k can be replaced by one of length k or
k+1 (same parity as L) without overlapping anything new. Shrinking also only moves the right end left, which never
hurts later choices. Therefore **only palindromes of length exactly k or k+1 matter**, and each DP step checks just
those two candidates ending at i.

## Algorithm
`dp[0] = 0`. For i = 1..n:
- `dp[i] = dp[i−1]` (position i−1 is unused),
- if `i ≥ k` and `s[i−k..i)` is a palindrome: `dp[i] = max(dp[i], dp[i−k] + 1)`,
- if `i ≥ k+1` and `s[i−k−1..i)` is a palindrome: `dp[i] = max(dp[i], dp[i−k−1] + 1)`.

Return `dp[n]`.

## Why it works
Take any optimal selection and shrink each piece to length k or k+1 around its centre. The pieces stay disjoint and
the count is unchanged. The DP explores all selections made of such short pieces, so it reaches the optimum.

## JavaScript implementation details
- `isPalindrome(lo, hi)` uses a half-open range `[lo, hi)` and a two-pointer loop with `hi--` first. Half-open
  ranges keep lengths as simply `hi − lo`.
- Each check is O(k), so the total is O(n·k) ≤ 4·10⁶.

## Edge cases
- k = 1: every character is a palindrome, so the answer is n.
- No palindrome of length ≥ k → 0.
- The only palindrome is long (e.g. "abcdcba" with k = 4): it shrinks to "bcdcb" (length 5 = k+1). This is why
  k+1 must be checked, not only k.

## Bugs / debugging
None. It was verified against the unrestricted all-palindromes DP on 500 random binary strings with random k.

## Alternatives considered
- Full palindrome table plus O(n²) DP (the oracle).
- Greedy: scan left to right and cut at the earliest point where a palindrome of length k or k+1 ends. It's also
  correct, with the same observation.

## Complexity
- Time: O(n·k).
- Space: O(n).

## Reusable pattern
**Canonical-form reduction.** Prove that any solution can be transformed into one using only "small" pieces
without losing value. Then search only over small pieces. (Palindromes shrink from both ends; intervals shrink to
their tightest form.)

## What to take away personally
Ask "can I shrink this choice without harming the answer?". Here it removes a whole dimension from the DP. Always
test the k+1 case separately.
