# 940. Distinct Subsequences II

| Field | Value |
|---|---|
| Daily Challenge date | 2026-09-07 |
| Solved | 2026-09-28, after the daily window (solved problem, not a completed Daily Challenge) |
| Difficulty | Hard |
| Topics | String, Dynamic Programming |
| Link | https://leetcode.com/problems/distinct-subsequences-ii/ |
| Result | Accepted, 110/110 tests, 5 ms, 55.1 MB (submission 2156487174) |

## What it asks (own words)
Count the distinct non-empty strings you can get by deleting characters from `s` (keeping order). Unlike 115, two
deletions that produce the *same string* count once. Answer modulo 10⁹+7.

## Key constraints
- |s| ≤ 2000, lowercase letters only (26 symbols). This hints at per-letter state.

## Reasoning
The hard part is avoiding duplicates. Group subsequences by their **last character**:
`endsWith[c]` = number of distinct subsequences (so far) that end in `c`.

When we read a new character `c`:
- Every distinct subsequence seen so far, with `c` appended, is a distinct subsequence ending in `c`. That's
  `total` strings, plus the single-character string "c", for `total + 1`.
- Every subsequence that previously ended in `c` is also in this new set (take its prefix, which is some earlier
  subsequence or empty, and append this newer `c`). So the new set **replaces** the old `endsWith[c]` rather than
  adding to it. That replacement is exactly what removes duplicates.

So `endsWith[c] = total + 1`, and `total` changes by `(new − old)`.

## Algorithm
1. `endsWith[26] = 0`, `total = 0`.
2. For each char c: `updated = total + 1`; `total = total − endsWith[c] + updated`; `endsWith[c] = updated`
   (all mod 10⁹+7).
3. Return `total`.

## Why it works
Every distinct non-empty subsequence has a unique last character, so the groups partition the set and
`total = Σ endsWith`. The update rule builds the exact set of distinct subsequences ending in c using all
characters seen so far, as argued above.

## JavaScript implementation details
- **Modular subtraction:** `(total − endsWith[c] + updated + MOD) % MOD`. Adding MOD before `%` keeps the value
  non-negative, because JS `%` keeps the sign of the dividend (`-3 % 7 === -3`).
- All values stay < 2·MOD + MOD ≈ 3×10⁹ before the `%`, far below 2⁵³, so float arithmetic is exact.
- Numeric separators (`1_000_000_007`) improve readability.
- `charCodeAt(i) − 97` maps 'a'..'z' → 0..25.

## Edge cases
- "aaa" → 3 ("a", "aa", "aaa"): each new 'a' replaces endsWith['a'] with total+1.
- All distinct letters, length n → 2ⁿ − 1.
- Long strings → the modulo keeps values bounded (a test checks the result is an integer in range for n = 2000).

## Bugs / debugging
None. It was verified against a brute force that enumerates all 2ⁿ masks into a `Set` for random strings of up to
12 characters over {a,b,c}.

## Alternatives considered
- `dp[i] = 2·dp[i−1] − dp[last[c]−1]`: the classic "doubling minus duplicates from the previous occurrence"
  formulation. It is equivalent, but the per-letter version is easier to reason about.
- A Set of strings: exponential.

## Complexity
- Time: O(n) (O(1) per character thanks to maintaining `total`).
- Space: O(26) = O(1).

## Reusable pattern
**Count distinct objects by grouping on a canonical feature (here: the last character) so that duplicates collapse
into a "replace, don't add" update.**

## What to take away personally
Compare this with 115: "count ways" (positions matter) versus "count distinct strings" (only content matters). The
first adds, the second replaces. Also remember to always add MOD before `%` when subtracting.
