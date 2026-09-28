# 1520. Maximum Number of Non-Overlapping Substrings

| Field | Value |
|---|---|
| Daily Challenge date | 2026-09-18 |
| Solved | 2026-09-28, after the daily window (solved problem, not a completed Daily Challenge) |
| Difficulty | Hard |
| Topics | Hash Table, String, Greedy, Sorting |
| Link | https://leetcode.com/problems/maximum-number-of-non-overlapping-substrings/ |
| Result | Accepted, 285/285 tests, 18 ms, 60.9 MB (submission 2156489786) |

## What it asks (own words)
Choose as many disjoint substrings as possible where each substring is "closed": if it contains a letter, it
contains *every* occurrence of that letter in the whole string. Among the maximum-count choices, return the one with
the smallest total length (it is unique). The order of the output doesn't matter.

## Key constraints
- n ≤ 10⁵, but only 26 distinct letters → at most 26 candidate substrings.

## Reasoning
1. **Candidates.** A closed substring that starts at position i must contain all of `s[i]`, so for the *smallest*
   closed substring starting at `first[c]`: start with `[first[c], last[c]]`, and while scanning it, extend the end
   to `last[x]` of any letter x found inside. If some letter inside first appears *before* the start, no closed
   substring starts here (it would have to extend left). Only starts at some `first[c]` can be minimal, which gives
   at most 26 candidates, each found in O(n).
2. **Structure.** Two closed substrings can never partially overlap. If they share a position with letter x, both
   contain all of x. With a bit more care this shows they are either disjoint or nested. So the candidates form a
   forest of nested intervals.
3. **Selection.** To maximize count and then minimize length, we want the innermost intervals. Scan the candidates by
   start. If one starts after the last kept interval ends, keep it. Otherwise it lies inside the last kept one, so
   **replace** that one (same count, shorter, and it ends no later).

## Algorithm
Compute `first`/`last` per letter. For i in order where `i === first[s[i]]`: `end = closedEnd(i)`; skip if −1; if
`i > prevEnd`, push `s.slice(i, end+1)`, otherwise overwrite the last element; set `prevEnd = end`.

## Why it works
Among nested candidates, the innermost one is always at least as good (same contribution of 1, shorter, and it
leaves more room). Among disjoint candidates, taking all of them is optimal. The replace-if-inside scan implements
exactly "keep all innermost candidates in left-to-right order".

## JavaScript implementation details
- `charCodeAt(i) − 97` for letter indices, with arrays of 26 instead of Maps.
- `s.slice(i, end + 1)` has an exclusive end, hence the `+ 1`.
- The tests normalize outputs with `[...arr].sort()` because any order is accepted.

## Edge cases
- The whole string is the only closed substring (e.g. "abab") → one piece.
- All letters distinct → every letter alone.
- Nested candidates: "abba" → ["bb"] rather than ["abba"].

## Bugs / debugging
None. It was verified against an exhaustive DP over all closed substrings (maximize count, then minimize total
length) on 800 random strings over {a,b,c,d}.

## Alternatives considered
- Collect the ≤26 candidates, sort by end, and greedily take the earliest-ending non-overlapping ones. This is the
  interval-scheduling view of the same idea.

## Complexity
- Time: O(26·n) in the worst case (each candidate scan is O(n)).
- Space: O(26) plus the output.

## Reusable pattern
**Closure / expansion intervals + laminar (nested-or-disjoint) structure → greedy innermost selection.** Also: when
the alphabet is small, "one candidate per distinct letter" bounds the search.

## What to take away personally
Proving that candidates are nested-or-disjoint is what makes the greedy safe. Look for that structural property
before trusting a greedy on intervals.
