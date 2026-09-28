# 115. Distinct Subsequences

| Field | Value |
|---|---|
| Daily Challenge date | 2026-09-06 |
| Solved | 2026-09-28, after the daily window (solved problem, not a completed Daily Challenge) |
| Difficulty | Hard |
| Topics | String, Dynamic Programming |
| Link | https://leetcode.com/problems/distinct-subsequences/ |
| Result | Accepted, 66/66 tests, 18 ms, 57.5 MB (submission 2156487117) |

## What it asks (own words)
Count how many different ways you can delete characters from `s` so that what remains is exactly `t`. Two ways
are different if they keep a different set of positions from `s`.

## Key constraints
- |s|, |t| ≤ 1000 → O(|s|·|t|) = 10⁶ is fine.
- The final answer fits in a signed 32-bit integer. **This matters in JS**, see below.

## Reasoning
Classic two-string DP. Let `f(i, j)` = number of ways to form `t[0..j)` using `s[0..i)`. For the i-th character
of `s`, either:
- don't use it: `f(i−1, j)` ways, or
- use it to match `t[j−1]` (only if the characters are equal): `f(i−1, j−1)` ways.

So `f(i, j) = f(i−1, j) + [s[i−1] = t[j−1]] · f(i−1, j−1)`, with `f(·, 0) = 1` (the empty string can be formed one
way) and `f(0, j>0) = 0`.

## Algorithm
Row `i` only depends on row `i−1`, so keep one array `dp` of length |t|+1:
1. `dp[0] = 1`, the rest 0.
2. For each character `ch` of `s`: for `j` from |t| **down to** 1, if `t[j−1] === ch` then `dp[j] += dp[j−1]`.
3. Return `dp[|t|]`.

## Why it works
Walking `j` right-to-left means that when `dp[j]` reads `dp[j−1]`, the value hasn't been updated for the current
character yet. It is still `f(i−1, j−1)`. Walking left-to-right would let one character of `s` match two consecutive
characters of `t` (e.g. count "a" in s once toward "aa" in t twice). This is the same reason the 0/1 knapsack
iterates capacity downwards.

## JavaScript implementation details: number precision
JS numbers are 64-bit floats and are exact only up to 2⁵³. Some intermediate `dp[j]` can be astronomically large
(for `s = "a"×1000`, `dp[500]` reaches C(1000,500) ≈ 2.7×10²⁹⁹). Can that corrupt the answer? No:
- `dp` values only ever increase, and each value is a sum of earlier values that are each ≤ it.
- So any value that eventually contributes to `dp[|t|]` is ≤ the final answer < 2³¹, and so are all of *its*
  contributors, recursively. They are all exact.
- Huge, inexact values never contribute to the final cell (if they did, the answer would be huge too, contradicting
  the guarantee). They also never overflow to `Infinity`, since the maximum is about 10³⁰⁰ < 1.8×10³⁰⁸.

In Java/C++ people rely on int overflow wrapping to the right answer. In JS the argument is different, but the
conclusion is the same. The test file includes a case with a huge intermediate and a 0 answer.

## Edge cases
- |t| > |s| → 0 immediately.
- Case-sensitive: 'A' ≠ 'a'.
- `s = "aaaa"`, `t = "aa"` → C(4,2) = 6.

## Bugs / debugging
None on submission. The key risk (loop direction) was addressed by reasoning, then verified with a brute force
that enumerates index choices recursively, on 500 random strings.

## Alternatives considered
- Full 2-D table: same time, O(|s|·|t|) memory (10⁶ entries, fine but unnecessary).
- Memoized recursion: natural to write but risks deep recursion at 1000×1000.

## Complexity
- Time: O(|s|·|t|).
- Space: O(|t|).

## Reusable pattern
**Two-sequence DP with rolling array + reverse iteration.** Anything shaped like "use each item of A at most once to
build B" (subsequence counting, 0/1 knapsack) can compress to one row if you iterate the dependent index backwards.

## What to take away personally
Derive the recurrence from "what happens to the last character: used or not?". Then ask which direction to
iterate so each input is used once. Also remember that JS numbers are floats.
